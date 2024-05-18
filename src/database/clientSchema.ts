import mongoose, { Schema, Document, Types } from "mongoose";

export interface iClient extends Document {
  firstName: string;
  lastName: string;
  birthDate: Date;
  entryDates: Date[];
  phoneNumber: string;
  email: string;
  address: string;
  authMem: [];
  householdMem: [];
  notes: [];
  isFlagged: boolean;
  isCheckedOff: boolean;
}

/**
 * Calculates the age based on the provided birthdate.
 * @param {Date} birthDate - The birthdate of the client.
 * @returns {number} The age of the client in years.
 */
function calculateAge(birthDate: Date): number {
  if (typeof birthDate === "string") {
    birthDate = new Date(birthDate);
  }

  const today: Date = new Date();
  let age: number = today.getFullYear() - birthDate.getFullYear();
  const monthDifference: number = today.getMonth() - birthDate.getMonth();

  // Check if the birthdate has not occurred yet this year
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

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
  notes: [
    {
      type: String,
      required: true,
    },
  ],
  householdMem: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "HouseholdMember", // references the AuthorizedMember model (that's exported within the householdMember file)
    },
  ],
  isFlagged: {
    type: Boolean,
    required: true,
  },
  isCheckedOff: {
    type: Boolean,
    required: true,
  },
  // family_unit: TBA
});

export default mongoose.models.Client ||
  mongoose.model<iClient>("Client", ClientSchema, "client");
