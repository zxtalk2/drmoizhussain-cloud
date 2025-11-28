import dbConnect from "../../../lib/db";
import { Workshop } from "../../../lib/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const workshops = await Workshop.find({}).sort({ createdAt: -1 });
    return NextResponse.json(workshops);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const workshop = await Workshop.create(body);
    return NextResponse.json(workshop, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...updateData } = body;
    const workshop = await Workshop.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return NextResponse.json(workshop);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Workshop.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
