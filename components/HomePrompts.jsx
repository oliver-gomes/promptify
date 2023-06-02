"use client";

import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";

const HomePrompts = () => {
  const { data: session } = useSession();
  const [allPrompts, setAllPrompts] = useState([]);

  const [upvoteState, setUpvoteState] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(false);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/prompt/`);
      const data = await response.json();

      setAllPrompts(data);
    };

    if (session?.user.id) fetchPrompts();
  }, [session?.user.id, upvoteState]);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPrompts.filter(
      (item) => regex.test(item.tag) || regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 300)
    );
  };

  return (
    <div className="mx-auto w-6/12">
      <form>
        <input
          type="text"
          placeholder="Search for Tag or Prompt text"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search-input"
        ></input>
      </form>

      <div>
        {searchText
          ? searchedResults.map((singlePrompt) => (
              <PromptCard
                {...singlePrompt}
                setUpvoteState={setUpvoteState}
              ></PromptCard>
            ))
          : allPrompts.map((singlePrompt) => (
              <PromptCard
                {...singlePrompt}
                setUpvoteState={setUpvoteState}
              ></PromptCard>
            ))}
      </div>
    </div>
  );
};

export default HomePrompts;
