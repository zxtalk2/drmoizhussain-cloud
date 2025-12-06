import dbConnect from "../../../lib/db";
import { Contact } from "../../../lib/models";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

// Helper function to sanitize input (prevent XSS)
function sanitizeInput(str) {
  if (!str) return "";
  return String(str)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// PROTECTED: Only admin can view all contacts
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // Input validation
    const name = sanitizeInput(body.name);
    const email = sanitizeInput(body.email);
    const phone = sanitizeInput(body.phone);
    const message = sanitizeInput(body.message);

    // Validate required fields
    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters" },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    if (!message || message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { error: "Message must be between 10 and 2000 characters" },
        { status: 400 }
      );
    }

    const contact = await Contact.create({
      name,
      email,
      phone: phone || "",
      message,
    });
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id, read } = await req.json();
    const contact = await Contact.findByIdAndUpdate(
      id,
      { read },
      { new: true }
    );
    return NextResponse.json(contact);
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
    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
