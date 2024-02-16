import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Navigate,
  useLocation,
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";
import {
  update_user,
  user_Image_update,
  messageClear,
  delete_account,
  user_reset,
} from "../store/reducer/authReducer";
import { toast } from "react-toastify";
import api from "../api/api";

const DashboardProfile = () => {
  const { userInfo, successMessage, errorMessage, updatedUser, deleteUser } =
    useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const fileRef = useRef();
  const dispatch = useDispatch();
  const inputHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const [state, setState] = useState({
    name: "",
    password: "",
  });
  const handleInput = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const updateUserInfo = (e) => {
    e.preventDefault();
    const obj = {
      id: userInfo.id,
      name: state.name,
      password: state.password,
    };
    dispatch(update_user(obj));
  };
  useEffect(() => {
    if (image) {
      changeImage();
    }
  }, [image]);
  const changeImage = (img, files) => {
    if (files.length > 0) {
      dispatch(
        user_Image_update({
          oldImage: img,
          newImage: files[0],
          userId,
        })
      );
    }
  };

  useEffect(() => {
    setState({
      name: userInfo.name,
      password: userInfo.password,
    });
  }, [userInfo]);

  const deleteAccount = (id) => {
    dispatch(delete_account(id));
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (deleteUser && successMessage) {
      toast.success(successMessage);
      setTimeout(() => {
        navigate("/login");
        dispatch(messageClear());
      }, 2000);
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);

  const logout = () => {
    try {
      const { data } = api.post("/user/logout");
      localStorage.removeItem("userToken");
      dispatch(user_reset());
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="mt-5 text-center">
      <h1 className="text-center">Profile</h1>
      <form onSubmit={updateUserInfo}>
        <input
          type="file"
          accept="image/*"
          onChange={inputHandle}
          name="image"
          // className="d-none"
          hidden
          ref={fileRef}
        />
        <div className="image_height_width">
          <img
            src={imageUrl || userInfo.image}
            onChange={(e) => changeImage(img, e.target.files)}
            alt="User"
            name="image"
            className="image_style"
            id="image"
            onClick={() => fileRef.current.click()}
          />
        </div>
        <div className="flex_center">
          <div className="my-3 w-75">
            <input
              type="text"
              name="name"
              className="form-control "
              defaultValue={state.name}
              onChange={handleInput}
              id=""
            />
          </div>
          <div className="mb-3 w-75">
            <input
              type="email"
              name="email"
              className="form-control "
              defaultValue={userInfo.email}
              id=""
              readOnly
            />
          </div>
          <div className="mb-3 w-75">
            <input
              type="password"
              name="password"
              className="form-control "
              id=""
              onChange={handleInput}
            />
          </div>
        </div>
        <div>
          <button className="btn btn-outline-primary w-75">
            Update Profile
          </button>
        </div>
        {userInfo.role === "admin" && (
          <Link to="/create-post">
            <button className="btn btn-outline-secondary w-75 mt-3">
              Create Post
            </button>
          </Link>
        )}
      </form>
      <div className="text-danger d-flex justify-content-between px-5 mx-5  mt-3 ">
        <span
          className="px-3 cursor_pointer"
          onClick={(id) => deleteAccount(userInfo.id)}
        >
          Delete Account
        </span>
        <span className="px-3 cursor_pointer" onClick={logout}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default DashboardProfile;
