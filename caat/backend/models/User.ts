import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  name?: string;
  age?: number;
  school?: string;
  major?: string;
  languages?: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  facebook?: string;
  instagram?: string;
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },

    // Additional Profile Fields
    name: { type: String, default: "", trim: true },
    age: { type: Number, default: null },
    school: { type: String, default: "", trim: true },
    major: { type: String, default: "", trim: true },
    languages: { type: String, default: "", trim: true },

    // Social Media Links
    linkedIn: { type: String, default: "", trim: true },
    github: { type: String, default: "", trim: true },
    portfolio: { type: String, default: "", trim: true },
    facebook: { type: String, default: "", trim: true },
    instagram: { type: String, default: "", trim: true },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

export default mongoose.model<IUser>("User", UserSchema);
