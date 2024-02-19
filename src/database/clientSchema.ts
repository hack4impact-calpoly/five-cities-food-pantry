import mongoose, { Schema, Document } from "mongoose";

interface iClient extends Document {
  name: string;
  age: number;
  entryDates: Date[];
  phoneNumber: string;
  email: string;
  address: string;
}

const ClientSchema = new Schema<iClient>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 120,
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
  // family_unit: TBA
});

//if you omit the third argument here, mongoose will access a lowercase, pluralized version of the model name "client"
//with this set up, it will access the 'client' collection within the ccwfp database
const IClientSchema =
  mongoose.models["client"] || mongoose.model("client", ClientSchema, "client");

export { IClientSchema };
