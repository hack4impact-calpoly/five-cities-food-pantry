import mongoose, { Schema, Types } from "mongoose";

interface IHouseholdMember extends Document {
  firstName: string;
  lastName: string;
  birthDate: Date;
  isAdult: boolean;
  headHousehold: Types.ObjectId;
  current: boolean;
}

const HouseholdMemberSchema = new Schema<IHouseholdMember>({
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
  },
  isAdult: {
    type: Boolean,
    required: true,
  },
  current: {
    type: Boolean,
    required: true,
  },
  headHousehold: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
});

const HouseholdMember =
  mongoose.models.HouseholdMember ||
  mongoose.model<IHouseholdMember>(
    "HouseholdMember",
    HouseholdMemberSchema,
    "householdMember"
  );

console.log(
  "Registered Models after defining HouseholdMember:",
  mongoose.models
);

export default HouseholdMember;
