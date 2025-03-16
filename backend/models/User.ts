import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  name?: string;
  age?: number;
  school?: string;
  major?: string;
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: "" }, // New field
    age: { type: Number, default: null }, // New field
    school: { type: String, default: "" }, // New field
    major: { type: String, default: "" }, // New field
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

export default mongoose.model<IUser>('User', UserSchema);
