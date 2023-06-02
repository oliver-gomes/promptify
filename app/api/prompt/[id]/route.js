import Prompt from "../../../../models/prompt";
import { connectToDB } from "../../../../utils/database";

export const PATCH = async (request, { params }) => {
  const { userId } = await request.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt.upvotes.includes(userId)) {
      await existingPrompt.updateOne({ $push: { upvotes: userId } });
    } else {
      await existingPrompt.updateOne({ $pull: { upvotes: userId } });
    }

    return new Response("Prompt Upvotes/Downvoted", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Error Updating Prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    const selectedPrompt = await Prompt.findById(params.id);
    await selectedPrompt.deleteOne();

    return new Response("Prompt Deleted", { status: 200 });
  } catch (err) {
    return new Response("Error Deleteing Prompt", { status: 500 });
  }
};
