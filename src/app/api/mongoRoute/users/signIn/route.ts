import connect from "@/app/lib/db/mongodb";
import User from "@/app/lib/models/UserSchema";
import { NextRequest, NextResponse } from "next/server";

// Get user by ID
export async function GET(request: NextRequest) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Error retrieving user", error },
      { status: 500 }
    );
  }
}


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

  // Delete user function
export async function DELETE(request: NextRequest) {
  try {
    await connect();
    const { userId } = await request.json();

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in deleting user:", error);
    return NextResponse.json(
      { message: "Error deleting user", error },
      { status: 500 }
    );
  }
}