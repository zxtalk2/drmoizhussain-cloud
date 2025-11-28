import dbConnect from "../../../../lib/db";
import { Testimonial } from "../../../../lib/models";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  // Fetch ALL testimonials for admin, sorted by pending first
  const testimonials = await Testimonial.find({}).sort({
    isApproved: 1, // false (Pending) first
    createdAt: -1,
  });
  return NextResponse.json(testimonials);
}

export async function PUT(request) {
  await dbConnect();
  const body = await request.json();
  const { id, isApproved } = body;

  const testimonial = await Testimonial.findByIdAndUpdate(
    id,
    { isApproved },
    { new: true }
  );

  return NextResponse.json(testimonial);
}

export async function DELETE(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  await Testimonial.findByIdAndDelete(id);

  return NextResponse.json({ message: "Testimonial deleted" });
}
