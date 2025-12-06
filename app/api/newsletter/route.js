import dbConnect from "../../../lib/db";
import { Newsletter } from "../../../lib/models";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to sanitize input
function sanitizeInput(str) {
  if (!str) return "";
  return String(str)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim()
    .toLowerCase();
}

// PROTECTED: Only admin can view all subscribers
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
    const body = await req.json();
    const email = sanitizeInput(body.email);

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

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
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Newsletter.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
