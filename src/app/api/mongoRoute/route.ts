import connect from "@/app/lib/db/mongodb";
import User from "@/app/lib/models/UserSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const data = await User.find();
    console.log("r", data);
    return NextResponse.json({ message: "success connect to mongodb" });
  } catch (error) {
    return NextResponse.json({ message: "fail connect to mongodb", error });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { username, email, password } = await request.json();

    // Check if user already exists with the provided email
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      return NextResponse.json(
        { message: "Email is already registered" },
        { status: 400 }
      );
    }

    // Check if user already exists with the provided username
    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser) {
      return NextResponse.json(
        { message: "Username is already taken" },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = new User({ username, email, password });
    console.log("Creating user:", newUser);
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}
