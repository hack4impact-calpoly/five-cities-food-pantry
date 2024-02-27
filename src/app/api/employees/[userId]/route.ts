import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../database/db";
import IEmployeeSchema from "../../../../database/employeeSchema";

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

    // Fetching single employee using userId from params
    const employee = await IEmployeeSchema.findOne({ _id: userId });
    console.log("Employee ID: ", userId, "\n", "Employee Data: ", employee);

    // If the Employee is not found, return a 404 response
    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found." },
        { status: 404 }
      );
    }
    // Returning employee if found
    return NextResponse.json(employee);
  } catch (err) {
    console.error("Error fetching employee:", err);
    return NextResponse.json(
      { error: "Error fetching employee." },
      { status: 500 }
    );
  }
}