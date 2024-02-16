import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getSinglePost,
  messageClear,
  update_post,
} from "../store/reducer/postReducer";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const UpdatePost = () => {
  const { postId } = useParams();
  const { successMessage, errorMessage, post } = useSelector(
    (state) => state.post
  );
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [imageShow, setImageShow] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImage(files[0]);
      setImageShow(URL.createObjectURL(files[0]));
    }
  };
  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, []);
  useEffect(() => {
    setState({
      title: post.title,
      category: post.category,
      image: post.image,
      description: post.description,
    });
  }, [post]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const obj = {
      postId,
      userId: userInfo.id,
      state,
    };
    dispatch(update_post(obj));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      navigate("/dashboard/?tab=posts");
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="text-center mt-5">
      <h1>Update Post</h1>
      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control mb-4"
                placeholder="Title"
                onChange={(e) => {
                  setState({ ...state, title: e.target.value });
                }}
                value={state.title}
              />
            </div>
            <div className="col-md-4">
              <select
                onChange={(e) => {
                  setState({ ...state, category: e.target.value });
                }}
                value={state.category}
                className="form-control mb-4"
              >
                <option value="">Select Category</option>
                <option value="nodejs">Node js</option>
                <option value="react">React </option>
                <option value="javascript">Javacript</option>
                <option value="express">Express </option>
                <option value="mongodb">Mongodb</option>
                <option value="Redux">Redux </option>
              </select>
            </div>
          </div>
          <div className="upload_image_border mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={imageHandle}
              // required
            />
          </div>
          {state.image && (
            <img src={state.image} className="w-100 h-500 mb-5" alt="" />
          )}
          <ReactQuill
            theme="snow"
            placeholder="Write a Post"
            className="h-72 mb-12"
            onChange={(value) => {
              setState({ ...state, description: value });
            }}
            value={state.description}
          />

          <button className="btn btn-primary mt-2 w-100">Update Blog</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
