import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../database/db";
import IClientSchema from "../../../database/clientSchema";

export async function GET(req: NextRequest) {
  try {
    // Establishing database connection
    await connectDB();

    // Fetching clients
    const clients = await IClientSchema.find();

    // Checking if clients are found
    if (clients.length === 0) {
      return NextResponse.json(
        { message: "No clients found." },
        { status: 200 }
      );
    }

    // Returning clients if found
    return NextResponse.json(clients);
  } catch (err) {
    console.error("Error fetching clients:", err);
    return NextResponse.json(
      { error: "Error fetching clients." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const newClientData = await req.json();

    //create a new client using the data in body
    const newClient = new IClientSchema(newClientData);

    //save the new client to the database
    await newClient.save();
    console.log(newClient._id.valueOf());
    
    return NextResponse.json(
      { message: newClient._id.valueOf() },
      { status: 200 }
    );
  } catch (err) {
    //if unable to add client, return error
    console.log("Error adding client:", err);
    return NextResponse.json(
      { error: "Error adding client." },
      { status: 500 }
    );
  }
}
