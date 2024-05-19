import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../database/db";
import IClientSchema from "../../../../database/clientSchema";

import HouseholdMember from "../../../../database/householdMemberSchema";

type IParams = {
  params: {
    userId: string;
  };
};

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    // Establishing database connection
    await connectDB();
    // ! This declaration fixes error of HouseholdMember Schema not found
    var HouseholdMember = require("../../../../database/householdMemberSchema");
    var AuthorizedMember = require("../../../../database/authorizedMemberSchema");

    //takes the userId from the URL path
    const { userId } = params;

    // Fetching single client using userId from params
    const client: any  = await IClientSchema.findOne({ _id: userId })
      .populate("householdMem")
      .populate("authMem");

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
    return NextResponse.json(
      { message: "Operation successful" },
      { status: 200 }
    );
  } catch (err) {
    //return an error if unable to delete the client
    console.error("Error deleting client:", err);
    return NextResponse.json(
      { error: "Error deleting client." },
      { status: 500 }
    );
  }
}
