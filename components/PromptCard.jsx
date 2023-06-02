import React from "react";

import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

const PromptCard = ({
  prompt,
  tags,
  _id,
  upvotes,
  creator,
  setUpvoteState,
}) => {
  const { data: session } = useSession();

  const handleUpVote = async () => {
    try {
      const response = await fetch(`/api/prompt/${_id}`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: session?.user.id,
        }),
      });
      setUpvoteState((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/prompt/${_id}`, {
        method: "DELETE",
      });
      setUpvoteState((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="prompt-card flex justify-between space-x-8">
      <div>
        <h2 className="font-semibold">{prompt}</h2>
        <p className="font-light text-sm">{tags}</p>
        {session?.user.id === creator && (
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
      <button className="flex flex-col items-center" onClick={handleUpVote}>
        {upvotes.includes(session?.user.id) ? (
          <FontAwesomeIcon
            icon={faCaretUp}
            size="2xl"
            className="upvoted"
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            icon={faCaretUp}
            size="2xl"
            className="not-upvoted"
          ></FontAwesomeIcon>
        )}
        {upvotes.length}
      </button>
    </div>
  );
};

export default PromptCard;
