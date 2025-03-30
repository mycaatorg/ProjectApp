import mongoose from "mongoose";

const ResumeSectionSchema = new mongoose.Schema({
  id: { type: String, required: true },         // Unique section ID (frontend handles this)
  label: { type: String, required: true },      // e.g., "Education", "Skills"
  content: { type: String, default: "" },       // Section text
});

// Resume model linked to a specific user
const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",       // Connects to the User model
    required: true,
    unique: true,      // One resume per user
  },
  sections: [ResumeSectionSchema],
}, { timestamps: true });

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
