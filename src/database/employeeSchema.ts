import mongoose, { Schema, Document } from "mongoose";

//should this follow an interface?
interface iEmployee extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

//added new keyword
const EmployeeSchema = new Schema<iEmployee>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  mongoose.model("Employee", EmployeeSchema, "employee");
