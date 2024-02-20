import connectDB from "@database/db";
import { NextResponse } from "next/server";
import Employee from "../../../database/employeeSchema";

/**
 * Example GET API route
 * @returns {message: string}
 */
export async function GET() {
  await connectDB();
  const employees = await Employee.find();
  return NextResponse.json({ message: "Hello from the API!" });
}
