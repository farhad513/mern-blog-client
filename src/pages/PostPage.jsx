import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPost, get_post, recentPost } from "../store/reducer/postReducer";
import Comments from "./Comments";
import PostCard from "./PostCard";
const PostPage = () => {
  const dispatch = useDispatch();
  const { post, posts } = useSelector((state) => state.post);
  console.log(posts);
  const { slug } = useParams();
  useEffect(() => {
    dispatch(get_post(slug));
  }, [slug]);
  useEffect(() => {
    dispatch(recentPost());
  }, []);
  return (
    <>
      <div className="text-center">
        <h2 className="text-center mt-5 mb-3">{post?.title}</h2>
        <Link to={`/search?category=${post?.category}`}>
          <button className="btn btn-outline-primary d-block mx-auto mb-3">
            {post?.category}
          </button>
        </Link>
        <img className="post_imge" src={post?.image} alt={post.title} />
        <div className="d-flex justify-content-between px-5 align-items-center">
          <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
          <span>{(post?.description?.length / 1000).toFixed(0)} min read</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post?.description }}></div>
      </div>
      <Comments postId={post?._id} />
      <div className="d-flex justify-content-center align-items-center flex-column mb-4">
        <h2 className=" mt-4">Recent Post</h2>
        <div className="d-flex flex-wrap gap-2">
          {posts.map((post, i) => {
            return <PostCard key={i} post={post} />;
          })}
        </div>
      </div>
    </>
  );
};

export default PostPage;
