import dbConnect from "../../../lib/db";
import { Video } from "../../../lib/models";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const videos = await Video.find({}).sort({ createdAt: -1 });
  return NextResponse.json(videos);
}

export async function POST(request) {
  await dbConnect();

  // Basic Auth Check
  const basicAuth = request.headers.get("authorization");
  if (!basicAuth) {
    return new NextResponse("Auth Required", { status: 401 });
  }
  const authValue = basicAuth.split(" ")[1];
  const [user, pwd] = atob(authValue).split(":");
  if (user !== process.env.ADMIN_USER || pwd !== process.env.ADMIN_PASSWORD) {
    return new NextResponse("Invalid Credentials", { status: 401 });
  }

  const body = await request.json();
  const video = await Video.create(body);
  return NextResponse.json(video);
}
