import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDbData } from "./utilities/firebase";
import Menu from "./navigation/Menu";
import FeedPage from "./pages/FeedPage";
import PostDetails from "./pages/PostDetails";
import PostPage from "./pages/PostPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { objectToArray } from "./utilities/helpers";
import { useAuthState } from "./utilities/firebase";

const App = () => {
  const [data, error] = useDbData("/");
  console.log("data", data);

  const [user] = useAuthState();
  console.log("user", user);

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (!data) return <h1>No user data found</h1>;

  const posts = objectToArray(data.posts);

  return (
    <div className="main-app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route index element={<FeedPage posts={posts} />}></Route>
            <Route
              path=":id"
              element={<PostDetails posts={posts} user={user} />}
            />
            <Route path="postpage" element={<PostPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
