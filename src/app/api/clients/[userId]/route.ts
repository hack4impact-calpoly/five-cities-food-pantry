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

// update a client's household members 
export async function PUT(req: NextRequest, { params }: IParams) {
  await connectDB();
  const { userId } = params;
  try {
    const body = await req.json();

    const updateData: any = {};
     // Dynamically add fields to updateData if they exist in the request body
     if (body.householdMem) {
      updateData.householdMem = body.householdMem;
    }
    if (body.authorizedMem) {
      updateData.authorizedMem = body.authorizedMem;
    }

    let updatedClient;

    if (updateData.householdMem) {
      updatedClient = await IClientSchema.findByIdAndUpdate(
        userId,
        { householdMem: updateData.householdMem},
        { new: true }
      );
    }
    if (updateData.authorizedMem) {
      updatedClient = await IClientSchema.findByIdAndUpdate(
        userId,
        { authMem: updateData.authorizedMem},
        { new: true }
      );
    }

    if (!updatedClient) {
      return NextResponse.json({ error: "Client not found." }, { status: 404 });
    }

    return NextResponse.json(updatedClient, { status: 200 });
  } catch (err) {
    console.error("Error updating client:", err);
    return NextResponse.json(
      { error: "Error updating client." },
      { status: 500 }
    );
  }
}

