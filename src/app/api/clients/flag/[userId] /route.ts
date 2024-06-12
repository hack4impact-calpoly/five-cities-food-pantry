import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../database/db";
import IClientSchema from "../../../../../database/clientSchema";

type IParams = {
  params: {
    userId: string;
  };
};

export async function PUT(req: NextRequest, { params }: IParams) {
  await connectDB();
  const { userId } = params;

  try {
    const body = await req.json();
    const { isFlagged, flagNotes } = body;

    if (typeof isFlagged !== "boolean" || typeof flagNotes !== "string") {
      return NextResponse.json(
        { error: "Invalid data. 'isFlagged' must be a boolean and 'flagNotes' must be a string." },
        { status: 400 }
      );
    }

    const client = await IClientSchema.findOneAndUpdate(
      { _id: userId },
      { isFlagged, flagNotes },
      { new: true }
    );

    if (!client) {
      return NextResponse.json(
        { message: "Client not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(client);
  } catch (err) {
    console.error("Error updating client:", err);
    return NextResponse.json(
      { error: "Error updating client." },
      { status: 500 }
    );
  }
}
