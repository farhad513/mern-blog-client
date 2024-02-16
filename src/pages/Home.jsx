import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/reducer/postReducer";
import PostCard from "./PostCard";
import { FaArrowRight } from "react-icons/fa6";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  console.log(posts);
  return (
    <div>
      <div className="banne_design">
        <h2>Hello,</h2>
        <h3>Welcome to my blog Website</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe eos
          sint provident ipsa distinctio consequuntur possimus. Nostrum animi
          voluptate quae odit, soluta architecto numquam cupiditate, facere,
          eius cum distinctio dicta.
        </p>
        <Link
          to={"/"}
          className="d-flex justify-content-center align-items-center gap-2 p-2 border bg-transparent text-white"
        >
          <button className="text-white border-0 bg-transparent">
            View All Post
          </button>
          <FaArrowRight />
        </Link>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column mb-4">
        <h2 className=" mt-4">Recent Post</h2>
        <div className="d-flex flex-wrap gap-2">
          {posts.map((post, i) => {
            return <PostCard key={i} post={post} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
