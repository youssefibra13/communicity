import React, { useState } from "react";
import { ChevronDown, ChevronUp, MessagesSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useDbUpdate, useDbData, useAuthState } from "../utilities/firebase";

const DetailsPostCard = ({ post, user }) => {
  //   const votes = 400;
  //   const tags = [
  //     "coffee shop",
  //     "coffee shop",
  //     "coffee shop",
  //     "coffee shop",
  //     "coffee shop",
  //   ];
  //   //   const tags = ["coffee shop"];
  //   const title = "collectivo";
  //   const content =
  //     "collectivo's latte buFfbeeyflSBFjdSBuLVfd ubfuelBULBFJ BFfuebuS F ubFuE:BUS:BFu ubu";
  const [vote, setVote] = useState(post.vote);
  //   console.log("user.uid", user.uid);
  const [updateVote] = useDbUpdate(`/posts/${post.id}`);
  const [updateUserInteraction] = useDbUpdate(`/users/${user.uid}`);

  const [value, error] = useDbData(`/users/${user.uid}/${post.id}`);

  const onUpArrow = () => {
    if (!value) {
      updateUserInteraction({ [`${post.id}`]: 1 });
    }

    // if prevValue then
    if (value < 1) {
      updateUserInteraction({ [`${post.id}`]: value + 1 });
    } else {
      return;
    }

    const newVote = vote + 1;
    setVote(newVote);
    updateVote({ vote: newVote });
  };

  const onDownArrow = () => {
    if (!value) {
      updateUserInteraction({ [`${post.id}`]: -1 });
    }

    // if prevValue then
    if (value > -1) {
      updateUserInteraction({ [`${post.id}`]: value - 1 });
    } else {
      return;
    }

    const newVote = vote - 1;
    setVote(newVote);
    updateVote({ vote: newVote });
  };

  const location = post.location;
  const tags = post.tags;
  const title = post.title;
  const content = post.description;
  const time = new Date().toLocaleTimeString();
  //   const filteredTags = tags.slice(0, 2);
  return (
    <div className="border-b-4 flex px-4 py-1 border-gray-600">
      <div className="grow flex flex-col">
        <div className="text-gray-400 ">
          <span>{time}</span>
        </div>
        <div className="text-2xl font-bold overflow-ellipsis">
          <span className="overflow-ellipsis">{title}</span>
        </div>

        <p>{content}</p>
        {/* image would go here */}
        <div className="flex justify-start pb-2">
          <span className="flex gap-2">
            {tags.map((tag, index) => (
              <Tag key={index} value={tag} />
            ))}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-20">
        {/* make these buttons */}
        <button onClick={onUpArrow}>
          <ChevronUp />
        </button>
        <p>{vote}</p>
        <button onClick={onDownArrow}>
          <ChevronDown />
        </button>
      </div>
    </div>
  );
};

const Tag = ({ value }) => {
  return (
    <button className="bg-orange-200 rounded-lg py-1 px-2 text-orange-600 font-bold uppercase text-xs">
      {value}
    </button>
  );
};

export default DetailsPostCard;
