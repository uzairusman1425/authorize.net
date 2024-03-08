import ConnectDB from "@/app/(db)/db";
import User from "@/app/(models)/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();
    await ConnectDB();
    const existinguser = await User.findOne({ username });
    if (existinguser) {
      return NextResponse.json({
        message: "User Already Exists",
        status: 401,
      });
    } else {
      const data = await new User({
        username,
        email,
        password,
      });
      data.save();
      return NextResponse.json({
        message: "USER CREATED SUCCESFULLY",
        status: 200,
      });
    }
  } catch {
    return NextResponse.json({
      message: "Error Creating the user ",
      status: 400,
    });
  }
}
