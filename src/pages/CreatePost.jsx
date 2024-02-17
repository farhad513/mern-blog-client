import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { addPost, messageClear } from "../store/reducer/postReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", state.title),
      form.append("category", state.category),
      form.append("image", image),
      form.append("description", state.description);
    dispatch(addPost(form));
  };
  const { successMessage, errorMessage, post } = useSelector(
    (state) => state.post
  );
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
      <h1>Create Post</h1>
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
              />
            </div>
            <div className="col-md-4">
              <select
                onChange={(e) => {
                  setState({ ...state, category: e.target.value });
                }}
                className="form-control mb-4"
                id=""
              >
                <option value="">Select Category</option>
                <option value="Google Analytics">Google Analytics</option>
                <option value="SEO">SEO </option>
                <option value="Content">Content</option>
                <option value="website">Website </option>
                <option value="Product Developemnt">Product Development</option>
              </select>
            </div>
          </div>
          <div className="upload_image_border mb-4">
            <input
              type="file"
              name=""
              accept="image/*"
              // onChange={(e) => setFile(e.target.files[0])}
              onChange={imageHandle}
              id=""
              required
            />
            {/* <button className="btn btn-outline-info" onClick={uploadImage}>
              Upload Image
            </button> */}
          </div>
          {imageShow && (
            <img src={imageShow} className="w-100 h-500 mb-5" alt="" />
          )}
          <ReactQuill
            theme="snow"
            placeholder="Write a Post"
            className="h-72 mb-12"
            onChange={(value) => {
              setState({ ...state, description: value });
            }}
          />

          <button className="btn btn-primary mt-2 w-100">Upload Blog</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
