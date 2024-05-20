import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../database/db";
import AuthorizedMember from "../../../database/authorizedMemberSchema";

export async function GET(req: NextRequest) {
  try {
    // Establishing database connection
    await connectDB();

    // Fetching clients
    const members = await AuthorizedMember.find();

    // Checking if clients are found
    if (members.length === 0) {
      return NextResponse.json(
        { message: "No authorized members found." },
        { status: 200 }
      );
    }

    // Returning clients if found
    return NextResponse.json(members);
  } catch (err) {
    console.error("Error fetching authorized members:", err);
    return NextResponse.json(
      { error: "Error fetching authorized members." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  
  try {
    const newAuthMemData = await req.json();

    //create a new client using the data in body
    const newAuthMem = new AuthorizedMember(newAuthMemData);

    //save the new client to the database
    await newAuthMem.save();

    return NextResponse.json(
      { message: newAuthMem._id.valueOf() },
      { status: 200 }
    );
  } catch (err) {
    //if unable to add authorized member, return error
    console.log("Error adding authorized member:", err);
    return NextResponse.json(
      { error: "Error adding authorized member." },
      { status: 500 }
    );
  }
}
