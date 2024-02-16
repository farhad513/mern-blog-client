import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { create_comment, get_Comment } from "../store/reducer/commentReducer";
import Comment from "./Comment";
const Comments = ({ postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const [comment, setComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      postId,
      userId: userInfo.id,
      comment,
    };
    dispatch(create_comment(obj));
    setComment("");
  };
  useEffect(() => {
    dispatch(get_Comment(postId));
  }, [postId]);
  const handleLike = (commentId) => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    
  };
  return (
    <div className="mx-auto p-3 w-full">
      {userInfo ? (
        <div className="d-flex my-2 gap-2">
          <p>Sign in as : </p>
          <Link to={`/dashboard/?tab=profile`}>@{userInfo?.name}</Link>
        </div>
      ) : (
        <div>
          You must be sign in your comment
          <Link to={"/login"}>Sign in</Link>
        </div>
      )}
      {userInfo && (
        <form className="mx-auto w-50" onSubmit={handleSubmit}>
          <textarea
            className="form-control"
            name=""
            id=""
            cols="30"
            placeholder="Add to Comment"
            rows="10"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            minLength={0}
            maxLength={200}
          ></textarea>
          <div className="d-flex justify-content-between mt-3 align-items-center">
            <p>{200 - comment.length} charactors remaining</p>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
      {comments && comments.length === 0 ? (
        <p className="text-center">Comments Not Found</p>
      ) : (
        <>
          <div className="d-flex gap-3 justify-content-center mt-3">
            <p>Comments : </p>
            <div className="comment_heading_border">
              <p>{comments?.length}</p>
            </div>
          </div>
          {comments?.map((comment, i) => {
            return <Comment comment={comment} key={i} onLike={handleLike} />;
          })}
        </>
      )}
    </div>
  );
};

export default Comments;
