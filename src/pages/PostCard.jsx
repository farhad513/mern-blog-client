import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <>
      <div className="col-xs-12 col-sm-4">
        <div className="card mb-3">
          <Link to={`/post/${post.slug}`}>
            <img src={post.image} alt="" className="card_image" />
          </Link>
          <div className="d-flex flex-column gap-1 p-3">
            <p className=" fw-semibold" style={{ fontSize: "20px" }}>
              {post.title.substr(0, 25)}
            </p>
            <span className="cat">{post.category}</span>
          </div>
          <Link
            className="btn btn-primary w-100 link"
            to={`/post/${post.slug}`}
          >
            Read More
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostCard;
