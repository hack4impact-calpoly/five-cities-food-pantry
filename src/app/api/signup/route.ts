import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../database/db";
import IUserSchema from "../../../database/userSchema";
import bcrypt from "bcrypt";

// expected request body
interface SignupRequestBody {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
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
    const { email, password, firstname, lastname } = (await parseBody(
      req
    )) as SignupRequestBody;

    // Attempting to find user associated with inputted email
    const user = await IUserSchema.findOne({ email: email });

    // * user does not exist, therefore creates a document with the user's information
    // ! NOTE: PASSWORD HASHING MUST OCCUR HERE.
    if (!user) {
      const salt = await bcrypt.genSalt(10); // Generate salt
      const hashedPassword = await bcrypt.hash(password, salt); 
      // User does not exist, create a document with the user's information
      const newUser = await IUserSchema.create({
        email: email,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname,
      });

      return NextResponse.json(
        { message: "User successfully created." },
        { status: 201 }
      );
    } else if (user) {
      // ! what status code to use here?
      return NextResponse.json(
        { message: "User with inputted email found, please login." },
        { status: 409 }
      );
    }
  } catch (err) {
    console.error("Error fetching user:", err);
    // ! how to make this error more descriptive?
    return NextResponse.json(
      { error: "Error occured with finding user." },
      { status: 500 }
    );
  }
}
