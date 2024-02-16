import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  console.log(post);
  return (
    <>
      <div className="card mb-2">
        <Link to={`/post/${post.slug}`}>
          <img src={post.image} alt="" className="card_image" />
        </Link>
        <div className="d-flex flex-column gap-1 p-3">
          <p className=" fw-semibold" style={{ fontSize: "20px" }}>
            {post.title}
          </p>
          <span className="cat">{post.category}</span>
        </div>
        <Link className="btn btn-primary w-100 link" to={`/post/${post.slug}`}>
          Read More
        </Link>
      </div>
    </>
  );
};

export default PostCard;
