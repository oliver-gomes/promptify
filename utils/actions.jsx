import Prompt from "../models/prompt";
import { connectToDB } from "./database";

export const submitPrompt = async (data) => {
  try {
    await connectToDB();
    const newPrompt = new Prompt(data);
    await newPrompt.save();
  } catch (err) {
    console.log(err);
  }
};
