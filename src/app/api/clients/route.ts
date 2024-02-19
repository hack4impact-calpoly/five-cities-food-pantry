import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../database/db";
import { IClientSchema } from "../../../database/clientSchema";

export async function GET(req: NextRequest) {
  try {
    // Establishing database connection
    await connectDB();

    // Fetching clients
    const clients = await IClientSchema.find();
    console.log("Clients: ", clients);

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
