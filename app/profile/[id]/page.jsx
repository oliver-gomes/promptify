"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PromptCard from "../../../components/PromptCard";

const ProfilePage = ({ params }) => {
  const { data: session } = useSession();
  const [userPrompt, setUserPrompt] = useState([]);
  const [upvoteState, setUpvoteState] = useState(false);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/user/${params.id}`);
      const data = await response.json();

      setUserPrompt(data);
    };

    if (session?.user.id) fetchPrompts();
  }, [session?.user.id, upvoteState]);

  return (
    <div className="flex flex-col">
      <h1 className="heading-text text-center my-4">My Prompts</h1>
      <div className="mx-auto">
        {userPrompt.length < 1 ? (
          <h3>
            Your Prompts is empty. Click on the Create Prompt to create one
          </h3>
        ) : (
          userPrompt.map((singleUserPrompt) => (
            <PromptCard {...singleUserPrompt} setUpvoteState={setUpvoteState} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
