import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../database/db";
import HouseholdMember, {IHouseholdMember} from "../../../database/householdMemberSchema";

export async function GET(req: NextRequest) {
  try {
    // Establishing database connection
    await connectDB();

    // Fetching clients
    const members = await HouseholdMember.find();

    // Checking if clients are found
    if (members.length === 0) {
      return NextResponse.json(
        { message: "No clients found." },
        { status: 200 }
      );
    }

    // Returning clients if found
    return NextResponse.json(members);
  } catch (err) {
    console.error("Error fetching members:", err);
    return NextResponse.json(
      { error: "Error fetching members." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { members } = await req.json();
    if (!Array.isArray(members)) {
      return NextResponse.json(
        { message: "Expected array of household members." },
        { status: 400 }
      );
    }

    const result = await HouseholdMember.insertMany(members);

    return NextResponse.json(
      { message: "Successfully added members."},
      {status: 200}

    )

    
    // const newMemberData = await req.json();

    // //create a new client using the data in body
    // const newMember = new IHouseholdMember(newMemberData);
    // console.log(newMember);

    // //save the new client to the database
    // await newMember.save();
    // return NextResponse.json(
    //   { message: "Operation successful" },
    //   { status: 200 }
    // );
  } catch (err) {
    //if unable to add client, return error
    console.log("Error adding members:", err);
    return NextResponse.json(
      { error: "Error adding members." },
      { status: 500 }
    );
  }
}
