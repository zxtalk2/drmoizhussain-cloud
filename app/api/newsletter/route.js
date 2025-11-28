import dbConnect from "../../../lib/db";
import { Newsletter } from "../../../lib/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const subscribers = await Newsletter.find({}).sort({ createdAt: -1 });
    return NextResponse.json(subscribers);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { email } = await req.json();

    // Check if email already exists
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.subscribed) {
        return NextResponse.json(
          { message: "Email already subscribed!" },
          { status: 400 }
        );
      } else {
        // Resubscribe
        existing.subscribed = true;
        await existing.save();
        return NextResponse.json({ message: "Resubscribed successfully!" });
      }
    }

    const subscriber = await Newsletter.create({ email });
    return NextResponse.json(
      { message: "Subscribed successfully!", subscriber },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Newsletter.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
