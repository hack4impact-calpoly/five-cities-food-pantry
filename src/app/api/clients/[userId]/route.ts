import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../database/db";
import IClientSchema from "../../../../database/clientSchema";

type IParams = {
  params: {
    userId: string;
  };
};

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    // Establishing database connection
    await connectDB();

    //takes the userId from the URL path
    const { userId } = params;

    // Fetching single client using userId from params
    const client = await IClientSchema.findOne({ _id: userId });
    console.log("Client ID: ", userId, "\n", "Client Data: ", client);

    // If the client is not found, return a 404 response
    if (!client) {
      return NextResponse.json(
        { message: "Client not found." },
        { status: 404 }
      );
    }
    // Returning clients if found
    return NextResponse.json(client);
  } catch (err) {
    console.error("Error fetching clients:", err);
    return NextResponse.json(
      { error: "Error fetching clients." },
      { status: 500 }
    );
  }
}
