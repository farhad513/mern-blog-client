import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getAllUser = createAsyncThunk(
  "user/getAllUser",
  async (_, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.get(`/user/get-all`, config);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_user = createAsyncThunk(
  "user/get_user",
  async (userId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.get(`/user/${userId}`, config);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.delete(`/user/delete/${userId}`, config);
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  successMessage: "",
  errorMessage: "",
  loading: false,
  users: [],
  user: {},
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getAllUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error;
      })
      .addCase(getAllUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
        state.users = payload.users;
      })
      .addCase(deleteUser.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
        state.user = payload.user;
      })
      .addCase(get_user.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(get_user.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error;
      })
      .addCase(get_user.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
        state.user = payload.user;
      });
  },
});

export const { messageClear } = userReducer.actions;

export default userReducer.reducer;
