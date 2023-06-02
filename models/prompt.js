import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tags: {
    type: String,
    required: [true, "Tags is required"],
  },
  upvotes: {
    type: Array,
  },
  creator: { type: String },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
