import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login_user, messageClear } from "../store/reducer/authReducer";
import { toast } from "react-toastify";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const submit = (e) => {
    e.preventDefault();
    dispatch(login_user(state));
  };
  const { successMessage, errorMessage, userInfo } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [errorMessage, successMessage]);
  return (
    <div className="Login_wrapper py-5 ">
      <div className="container ">
        <div className="row">
          <div className="col-12">
            <div className="form_card card">
              <h3 className="text-center">Login</h3>
              <form onSubmit={submit}>
                <div className="my-3">
                  <input
                    type="email"
                    placeholder="Please Enter Your Email "
                    className="form-control "
                    value={state.email}
                    onChange={handleInput}
                    name="email"
                    required
                  />
                </div>

                <div className="my-3">
                  <input
                    type="password"
                    placeholder="Please Enter Your Password "
                    className="form-control "
                    value={state.password}
                    onChange={handleInput}
                    name="password"
                    required
                  />
                </div>
                <div className="d-flex flex-column  gap-2  justify-content-center mx-auto btn_width  ">
                  <button className="btn btn-primary   ">Login</button>
                </div>
                <div className="my-2">
                  <p>
                    You Have No account.{" "}
                    <Link
                      to={"/register"}
                      className="text-decoration-none text-primary gap-1 "
                    >
                      Register
                    </Link>{" "}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
