import mongoose, { Schema, Document } from "mongoose";

export interface ICollege extends Document {
  name: string;
  country: string;
  domains: string[];
  web_pages: string[];
  alpha_two_code: string;
}

const CollegeSchema: Schema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  domains: { type: [String], default: [] },
  web_pages: { type: [String], default: [] },
  alpha_two_code: { type: String, required: true },
});

export default mongoose.model<ICollege>("College", CollegeSchema);
