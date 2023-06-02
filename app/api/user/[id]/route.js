import Prompt from "../../../../models/prompt";
import { connectToDB } from "../../../../utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const userPromps = await Prompt.find({ creator: params.id }).sort({
      createAt: -1,
    });

    return new Response(JSON.stringify(userPromps), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
