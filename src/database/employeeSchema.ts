import mongoose, { Schema } from "mongoose";
// ^ updated this to be an import, not requires mongoose

//should this follow an interface?

//added new keyword
const EmployeeSchema = new mongoose.Schema({
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
  mongoose.model("Employee", EmployeeSchema, "employee");