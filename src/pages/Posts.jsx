import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_post,
  getPost,
  messageClear,
} from "../store/reducer/postReducer";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Posts = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, errorMessage, posts } = useSelector(
    (state) => state.post
  );
  console.log(posts);
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const obj = {
      userId: userInfo.id,
      start: parseInt(showMore),
    };
    dispatch(getPost(obj));
  }, [userInfo.id]);

  const deletePost = (id) => {
    const obj = {
      userId: userInfo.id,
      postId: id,
    };
    dispatch(delete_post(obj));
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);
  return (
    <div>
      <table className="table mt-3 overflow-y-scroll">
        <thead className="mx-auto mt-5">
          <tr>
            <th scope="col">DATE</th>
            <th scope="col">IMAGE</th>
            <th scope="col">TIILE</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">DELETE</th>
            <th scope="col">EDIT</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, i) => {
            return (
              <tr key={i} className=" align-items-center">
                <th scope="row">
                  {new Date(post?.updatedAt).toLocaleDateString()}
                </th>
                <td>
                  <Link to={`/post/${post.slug}`}>
                    <img src={post?.image} className="table_image" alt="" />
                  </Link>
                </td>

                <td>
                  <Link to={`/post/${post.slug}`} className="text-dark">
                    {post?.title}
                  </Link>
                </td>
                <td>{post?.category}</td>
                <td>
                  <span
                    onClick={() => deletePost(post._id)}
                    className="text-danger fw-bold cursor_pointer"
                  >
                    DELETE
                  </span>
                </td>
                <td>
                  <Link to={`/update-post/${post._id}`} className="text-dark">
                    <span>EDIT</span>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* {showMore && <button>Show More</button>} */}
    </div>
  );
};

export default Posts;
