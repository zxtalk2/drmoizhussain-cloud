import dbConnect from "../../../../lib/db";
import { Testimonial } from "../../../../lib/models";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  // Fetch ALL testimonials for admin, sorted by pending first
  const testimonials = await Testimonial.find({}).sort({
    isApproved: 1, // false (Pending) first
    createdAt: -1,
  });
  return NextResponse.json(testimonials);
}

export async function PUT(request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  await Testimonial.findByIdAndDelete(id);

  return NextResponse.json({ message: "Testimonial deleted" });
}
