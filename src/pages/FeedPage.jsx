import React, { useState } from "react";
import PostCard from "../components/PostCard";
import { Link, Outlet } from "react-router-dom";
import SearchBar from "../components/searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "../utilities/firebase";

const FeedPage = ({ posts, onSearch }) => {
  const [sortType, setSortType] = useState("voteDesc");
  const [searchQuery, setSearchQuery] = useState(""); // Added state for search query
  const [user] = useAuthState();

  // Function to update the search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  // First filter the posts based on the search query, then sort them
  const filteredAndSortedPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortType) {
        case "voteAsc":
          return a.vote - b.vote;
        case "voteDesc":
          return b.vote - a.vote;
        case "alpha":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        {/* <SearchBar onSearch={onSearch} /> */}
        {/* Dropdown for sorting */}
        <select value={sortType} onChange={handleSortChange} className="mx-auto my-4">
          <option value="voteDesc">Votes - High to Low</option>
          <option value="voteAsc">Votes - Low to High</option>
          <option value="alpha">Alphabetical</option>
        </select>
        <div className="fixed right-2 bottom-2 post-icon mr-2 bg-red-600/80 p-4 rounded-full">
          <Link to={user ? "postpage" : null}>
            <FontAwesomeIcon icon={faPaperPlane} size="2x" />
          </Link>
        </div>
      </div>
      {/* Map over sortedPosts to render PostCard for each post */}
      <SearchBar onSearch={handleSearch} />
      <div>
        {filteredAndSortedPosts.map((post, index) => (
          <Link to={user ? `/${post.id}` : null} key={post.id}>
            <PostCard post={post} user={user} />
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default FeedPage;
