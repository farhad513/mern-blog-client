import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { messageClear, register_user } from "../store/reducer/authReducer";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async (e) => {
    try {
      e.preventDefault();
      dispatch(register_user(state));
    } catch (error) {
      console.log(error);
    }
  };
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { successMessage, errorMessage, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      navigate("/login");
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);
  return (
    <div className="register_wrapper py-5 ">
      <div className="container ">
        <div className="row">
          <div className="col-12">
            <div className="form_card card">
              <h3 className="text-center">Register</h3>
              <form onSubmit={submit}>
                <div className="my-3">
                  <input
                    type="text"
                    placeholder="Please Enter Your User Name"
                    className="form-control "
                    value={state.name}
                    onChange={handleInput}
                    name="name"
                    required
                  />
                </div>

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
                <div className="d-flex flex-column  gap-2  justify-content-center mx-auto btn_width mb-2  ">
                  <button className="btn btn-primary   ">Register</button>
                </div>
              </form>
              {/* <OAuth /> */}
              <div className="my-2">
                <p>
                  Already Have an account{" "}
                  <Link
                    to={"/login"}
                    className="text-decoration-none text-primary"
                  >
                    login
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
