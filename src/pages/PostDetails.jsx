import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DetailsPostCard from "../components/DetailsPostCard";
import Reply from "../components/Reply";
import { useState } from "react";
import { useDbUpdate } from "../utilities/firebase";

const PostDetails = ({ posts, user }) => {
  const { id } = useParams();
  console.log("id", id);
  console.log("posts", posts);
  const filteredPost = posts.filter((post) => post.id === Number(id));
  console.log("filteredPost", filteredPost);
  console.log("filteredPost.replies", filteredPost.replies);
  //const [isModalOpen, setIsModalOpen] = useState(false);
  // states for sending a messages as a SITTER
  const [messageText, setMessageText] = useState("");

  const [updateReplies] = useDbUpdate(`/posts/${id}/replies`);

  const submitMessage = () => {
    const newReplyIndex = filteredPost[0].replies
      ? filteredPost[0].replies.length
      : 0;
    console.log("newReplyIndex", newReplyIndex);
    const repliesUpdate = { [newReplyIndex]: messageText };

    updateReplies(repliesUpdate);
    setMessageText("");
  };

  return (
    <div>
      <div>
        <Link to="/">
          <ArrowLeft />
        </Link>
      </div>
      <div>
        <DetailsPostCard post={filteredPost[0]} user={user} />
      </div>
      <div className="border-l">
        {filteredPost[0].replies
          ? filteredPost[0].replies.map((reply) => {
              return <Reply reply={reply} />;
            })
          : null}
      </div>
      <div></div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitMessage();
        }}
      >
        <div className="flex bottom-0 fixed w-full">
          <textarea
            className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="1"
            placeholder="Type your message here..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="px-3 py-2 bg-green-500 text-white  hover:bg-green-700 transition duration-300"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostDetails;
