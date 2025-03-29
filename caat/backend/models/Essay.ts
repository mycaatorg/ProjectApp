import mongoose from "mongoose";

const EssaySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  essayType: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: "",
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Essay || mongoose.model("Essay", EssaySchema);
