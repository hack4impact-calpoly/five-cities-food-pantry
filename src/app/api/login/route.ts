import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../database/db";
import IUserSchema from "../../../database/userSchema";
import bcrypt from "bcrypt";

// expected request body
interface LoginRequestBody {
  email: string;
  password: string; // Include password if you need to authenticate
}

// A utility function to parse the request body
async function parseBody(request: NextRequest) {
  const contentType = request.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return request.json();
  }
  return {};
}

export async function POST(req: NextRequest) {
  try {
    // Establishing database connection
    await connectDB();

    // error if not typecasted to unknown first
    const { email, password } = (await parseBody(req)) as LoginRequestBody;

    // Attempting to find user associated with inputted email
    const user = await IUserSchema.findOne({ email: email });

    if (!user) {
      return NextResponse.json(
        { message: "No user found with that email." },
        { status: 404 }
      );
    }

    const passwordCorrect = await bcrypt.compare(password, user.password)

    if (!passwordCorrect) {
      return NextResponse.json(
        { message: "Invalid password." },
        { status: 401 }
      );
    }

    // Returning user if found and authenticated
    const { password: _, ...userWithoutPassword } = user.toObject(); // toObject() might be necessary depending on your schema setup
    return NextResponse.json({ user: userWithoutPassword, message: "Login successful." });
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json(
      { error: "Error with user authentication." },
      { status: 500 }
    );
  }
}
