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

export async function DELETE(req: NextRequest, { params }: IParams) {
  await connectDB();
  const { userId } = params;
  
  try {
    //find the client to delete by the given id
    const client = await IClientSchema.findOne({ _id: userId });
    await IClientSchema.findByIdAndDelete(client._id); 
    return NextResponse.json({ message: 'Operation successful' }, { status: 200 });
  }
  //return an error if unable to delete the client
  catch(err) {
    console.error("Error deleting client:", err);
    return NextResponse.json(
      { error: "Error deleting client." },
      { status: 500}
    );
  }
}

