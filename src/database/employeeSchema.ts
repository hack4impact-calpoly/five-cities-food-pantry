import mongoose, { Schema } from "mongoose";

interface IEmployee {
  username: string;
  email: string;
  password: string;
}

//added new keyword
const EmployeeSchema = new mongoose.Schema<IEmployee>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    //figure out how to hash this
    type: String,
    required: true,
  },
});

//added third argument so that it finds the "employee" collection
//changed to mongoose.models.Employee to fix "cannot overwrite 'Employee model once compiled" when attempting to get individual employee
export default mongoose.models.Employee ||
  mongoose.model<IEmployee>("Employee", EmployeeSchema, "employee");
