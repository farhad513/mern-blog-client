import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllUser,
  deleteUser,
  messageClear,
} from "../store/reducer/userReducer";
import { FaCheck, FaTimes } from "react-icons/fa";
const DashboardUser = () => {
  const { users, errorMessage, successMessage } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  const deleteuser = (id) => {
    dispatch(deleteUser(id));
    setTimeout(() => {
      dispatch(getAllUser());
    }, 1000);
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
            <th scope="col">USERNAME</th>
            <th scope="col">EMAIL</th>
            <th scope="col">ADMIN</th>
            <th scope="col">DELETE</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return (
              <tr key={i} className=" align-items-center">
                <th scope="row">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </th>
                <td>
                  <img src={user?.image} className="table_image" alt="" />
                </td>

                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                  {user?.role === "admin" ? (
                    <FaCheck />
                  ) : (
                    <FaTimes className="text-danger" />
                  )}
                </td>
                <td>
                  <span
                    onClick={() => deleteuser(user._id)}
                    className="text-danger fw-bold cursor_pointer"
                  >
                    DELETE
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardUser;
