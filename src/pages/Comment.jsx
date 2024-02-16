import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_user } from "../store/reducer/userReducer";
import { AiFillLike } from "react-icons/ai";
import moment from "moment";
const Comment = ({ comment, onLike }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_user(comment.userId));
  }, [comment.userId]);
  return (
    <div className="d-flex p-4 border border-bottom-2 w-50 mx-auto">
      <div className=" flex-shrink-0 me-3">
        <img className="comment_image" src={user?.image} alt={user?.name} />
      </div>
      <div className="flex-1">
        <div className="d-flex align-items-center my-2">
          <span className="me-1">
            {user ? `@${user?.name}` : "User Comment Deleted"}
          </span>
          <span>{moment(user?.createdAt).fromNow()}</span>
        </div>
        <p>{comment?.comment}</p>
        {/* <div>
          <button
            onClick={() => onLike(comment?._id)}
            className="border-0 bg-transparent like_btn"
          >
            <AiFillLike className="fs-5" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Comment;
