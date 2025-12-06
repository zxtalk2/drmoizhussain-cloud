import dbConnect from "../../../lib/db";
import { Testimonial } from "../../../lib/models";
import { NextResponse } from "next/server";

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

export async function GET() {
  await dbConnect();
  // Only fetch approved testimonials for public view
  const testimonials = await Testimonial.find({ isApproved: true }).sort({
    createdAt: -1,
  });
  return NextResponse.json(testimonials);
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Input validation
    const name = sanitizeInput(body.name);
    const role = sanitizeInput(body.role) || "Client";
    const quote = sanitizeInput(body.quote);

    // Validate required fields
    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters" },
        { status: 400 }
      );
    }

    if (!quote || quote.length < 10 || quote.length > 1000) {
      return NextResponse.json(
        { error: "Testimonial must be between 10 and 1000 characters" },
        { status: 400 }
      );
    }

    // Create new testimonial (default isApproved: false)
    const testimonial = await Testimonial.create({
      name,
      role,
      quote,
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
