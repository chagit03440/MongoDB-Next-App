import connect from "@/app/lib/db/mongodb";
import User from "@/app/lib/models/UserSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
      await connect();
      const { username, email, password } = await request.json();
  
      const user = await User.findOne({ username, email, password });
      if (!user) {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }
  
      return NextResponse.json(
        { message: "User authenticated successfully", user },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error in sign-in:", error);
      return NextResponse.json(
        { message: "Error signing in", error },
        { status: 500 }
      );
    }
  }