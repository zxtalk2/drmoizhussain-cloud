import dbConnect from "../../../lib/db";
import { Slider } from "../../../lib/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const slides = await Slider.find({ active: true }).sort({ order: 1 });
    return NextResponse.json(slides);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const slide = await Slider.create(body);
    return NextResponse.json(slide, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await dbConnect();
    const { id, ...updateData } = await req.json();
    const slide = await Slider.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(slide);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Slider.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
