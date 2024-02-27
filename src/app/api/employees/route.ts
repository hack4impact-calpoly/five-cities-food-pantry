import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../database/db";
import IEmployeeSchema from "../../../database/employeeSchema";

export async function GET(req: NextRequest) {
  try {
    // Establishing database connection
    await connectDB();

    // Fetching employees
    const employees = await IEmployeeSchema.find();
    console.log("Employees: ", employees);

    // Checking if employees are found
    if (employees.length === 0) {
      return NextResponse.json(
        { message: "No employees found." },
        { status: 200 }
      );
    }

    // Returning employees if found
    return NextResponse.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    return NextResponse.json(
      { error: "Error fetching employees." },
      { status: 500 }
    );
  }
}