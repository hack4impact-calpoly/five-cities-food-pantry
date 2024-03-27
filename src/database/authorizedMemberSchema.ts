import mongoose, { Schema, Types, Document } from "mongoose";

interface iAuthorizedMember extends Document {
  firstName: string;
  lastName: string;
  birthDate: Date;
  client: Types.ObjectId;
}

// used in validation for the date attribute of the schema
const calculateAge = (birthDate: Date) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);

  let age = today.getFullYear() - birthDateObj.getFullYear();
  const m = today.getMonth() - birthDateObj.getMonth();

  //decrease age by 1 if it has not yet occurred this year
  if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }

  return age;
};

const AuthorizedMemberSchema = new Schema<iAuthorizedMember>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (v: Date) {
        const age = calculateAge(v);
        return age >= 0 && age <= 120;
      },
      message: "Client age must be between 0 and 120 years.",
    },
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client", // references the Client model (that's exported within the clientSchema file)
  },
});

//name of model is "AuthorizedMember"
//looks for collection of name of third argument, "authorizedMember"
export default mongoose.models.AuthorizedMember ||
  mongoose.model(
    "AuthorizedMember",
    AuthorizedMemberSchema,
    "authorizedMember"
  );
