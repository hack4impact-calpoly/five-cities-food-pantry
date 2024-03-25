import mongoose, { Schema, Document, Types } from "mongoose";

interface iClient extends Document {
  firstName: string;
  lastName: string;
  birthDate: Date;
  entryDates: Date[];
  phoneNumber: string;
  email: string;
  address: string;
  authMem: Types.ObjectId[];
  householdMem: Types.ObjectId[];
  isFlagged: boolean;
}

// used in validation for the date attribute of the client schema
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

const ClientSchema = new Schema<iClient>({
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
  entryDates: [
    {
      type: Date,
      default: Date.now,
    },
  ],
  phoneNumber: {
    type: String,
    required: true,
    // Make sure phone number only contains numerical characters
    validate: {
      validator: function (v: string) {
        // Check if the phone number contains only numerical characters
        return /^\d+$/.test(v);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid phone number.`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // validate email using regex -- better way of validation?
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  address: {
    type: String,
    required: true,
    // validation ?
  },
  authMem: [
    {
      type: Schema.Types.ObjectId,
      ref: "AuthorizedMember", // references the AuthorizedMember model (that's exported within the AuthorizedMember file)
    },
  ],
  householdMem: [
    {
      type: Schema.Types.ObjectId,
      ref: "Client", // references the AuthorizedMember model (that's exported within the householdMember file)
    },
  ],
  isFlagged: {
    type: Boolean,
    required: true,
  },
  // family_unit: TBA
});

export default mongoose.models.Client ||
  mongoose.model<iClient>("Client", ClientSchema, "client");
