import dbConnect from "../../../lib/db";
import { Testimonial } from "../../../lib/models";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  // Only fetch approved testimonials for public view
  const testimonials = await Testimonial.find({ isApproved: true }).sort({
    createdAt: -1,
  });
  return NextResponse.json(testimonials);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();

  // Create new testimonial (default isApproved: false)
  const testimonial = await Testimonial.create({
    name: body.name,
    role: body.role || "Client",
    quote: body.quote,
  });

  return NextResponse.json(testimonial);
}
