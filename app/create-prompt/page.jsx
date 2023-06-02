import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { submitPrompt } from "../../utils/actions";
import { redirect } from "next/navigation";

const CreatePrompt = () => {
  const createPrompt = async (formData) => {
    "use server";
    const session = await getServerSession(authOptions);

    try {
      const post = await submitPrompt({
        prompt: formData.get("prompt"),
        tags: formData.get("tags"),
        creator: session.user.id,
      });
    } catch (err) {
      console.log(err);
    }
    redirect("/");
  };

  return (
    <div className="text-center mx-auto w-6/12">
      <h1 className="heading-text">Create Prompt</h1>
      <form className="mt-8" action={createPrompt}>
        <div>
          <label htmlFor="prompt" className="flex flex-col items-start">
            <span className="font-light">Enter Prompt</span>
            <textarea
              className="textarea-prompt my-4"
              name="prompt"
              id="prompt"
              placeholder="How do I make an HTTP request in NextJS"
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="tags" className="flex flex-col items-start">
            <span className="font-light">Enter tags</span>
            <textarea
              className="textarea-prompt my-4"
              name="tags"
              id="tags"
              placeholder="#nextjs #webdevelopment #tutorial"
              required
            />
          </label>
        </div>
        <button className="blue-btn">Enter</button>
      </form>
    </div>
  );
};

export default CreatePrompt;
