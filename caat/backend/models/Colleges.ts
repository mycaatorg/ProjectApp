import mongoose, { Schema, Document } from "mongoose";

export interface ICollege extends Document {
  name: string;
  country: string;
  website?: string;
}

const CollegeSchema = new Schema<ICollege>({
  name: { type: String, required: true },
  country: { type: String, required: true },
  website: { type: String },
});

export default mongoose.model<ICollege>("College", CollegeSchema);
