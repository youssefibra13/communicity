import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDbUpdate } from "../utilities/firebase";

const PostPage = () => {
  let navigate = useNavigate();
  const post_id = Date.now();

  const [updatePosts, posts] = useDbUpdate(`/posts/${post_id}`);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    tags: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "tags") {
      // Split the tags string by commas and trim whitespace from each tag
      const tagsArray = e.target.value.split(",").map((tag) => tag.trim());
      setFormData({ ...formData, [e.target.name]: tagsArray });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      id: post_id,
      title: formData.title,
      description: formData.description,
      replies: [],
      vote: 0,
      location: formData.location,
      tags: formData.tags,
    };
    console.log(post);
    updatePosts(post);
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-10">
        <h2 className="text-2xl font-bold mb-6">
          Post your complaint/concern here
        </h2>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-lg font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="tags"
            className="block text-lg font-medium text-gray-700"
          >
            Identification tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Separate tags with commas, e.g. 'Transportation,CTA'"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostPage;
