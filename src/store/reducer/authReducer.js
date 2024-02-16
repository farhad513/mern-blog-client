import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import jwtDecode from "jwt-decode";
import jwt from "jwt-decode";
import { base_url } from "../../../utils/config";
export const register_user = createAsyncThunk(
  "auth/register_user",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`${base_url}/api/auth/register`, info, {
        withCredentials: true,
      });

      localStorage.setItem("userToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login_user = createAsyncThunk(
  "auth/login_user",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`${base_url}/api/auth/login`, info);
      localStorage.setItem("userToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_user = createAsyncThunk(
  "auth/update_user",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.put(
        `${base_url}/api/user/update/${info.id}`,
        info,
        config
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const delete_account = createAsyncThunk(
  "auth/delete_account",
  async (id, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.delete(
        `${base_url}/api/user/delete/${id}`,
        config
      );
      localStorage.removeItem("userToken");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const user_Image_update = createAsyncThunk(
  "auth/user_Image_update",
  async (
    { oldImage, newImage, userId },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("userId", userId);
      const { data } = await api.post(
        `${base_url}/api/auth/login`,
        formData,
        config
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const decodeToken = (token) => {
  if (token) {
    const userInfo = jwt(token);
    const expired = new Date(userInfo.exp * 1000);
    if (new Date() > expired) {
      localStorage.removeItem("userToken");
      return "";
    } else {
      return userInfo;
    }
  } else {
    return "";
  }
};
const initialState = {
  userInfo: decodeToken(localStorage.getItem("userToken")),
  token: localStorage.getItem("userToken"),
  successMessage: true,
  errorMessage: false,
  loading: false,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state, _) => {
      state.userInfo = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register_user.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(register_user.fulfilled, (state, { payload }) => {
        const userInfo = decodeToken(payload.token);
        state.loading = false;
        state.successMessage = payload.message;
        state.userInfo = userInfo;
        state.token = payload.token;
      })
      .addCase(register_user.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error;
      })
      .addCase(login_user.pending, (state) => {
        state.loading = true;
      })
      .addCase(login_user.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error;
      })
      .addCase(login_user.fulfilled, (state, { payload }) => {
        const userInfo = decodeToken(payload.token);
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
        state.token = payload.token;
      })
      .addCase(update_user.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_user.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload;
      })
      .addCase(update_user.fulfilled, (state, { payload }) => {
        state.updatedUser = payload.updateUser;
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(delete_account.pending, (state) => {
        state.loading = true;
      })
      .addCase(delete_account.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload;
      })
      .addCase(delete_account.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loader = false;
        state.deleteuser = payload.deleteUser;
        state.userInfo = null;
      });
  },
});

export const { messageClear, user_reset } = authReducer.actions;

export default authReducer.reducer;
