import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { base_url } from "../../../utils/config";

export const create_comment = createAsyncThunk(
  "auth/create_comment",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.post(
        `${base_url}/api/comment/create`,
        info,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_Comment = createAsyncThunk(
  "auth/get_Comment",
  async (postId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.get(`${base_url}/api/comment/get/${postId}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const add_like_Comment = createAsyncThunk(
  "auth/add_like_Comment",
  async (commentId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.put(
        `${base_url}/api/comment/likecomment/${commentId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  successMessage: true,
  errorMessage: false,
  loading: false,
  comment: [],
};

const commentReducer = createSlice({
  name: "comment",
  initialState,
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create_comment.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(create_comment.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error;
      })
      .addCase(create_comment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
        state.comment = payload.newComment;
      })
      .addCase(get_Comment.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(get_Comment.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error;
      })
      .addCase(get_Comment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
        state.comments = payload.comments;
      })
      .addCase(add_like_Comment.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(add_like_Comment.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error;
      })
      .addCase(add_like_Comment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
        state.comment = payload.comment;
      });
  },
});

export const { messageClear } = commentReducer.actions;

export default commentReducer.reducer;
