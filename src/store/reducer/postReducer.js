import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
export const addPost = createAsyncThunk(
  "auth/addPost",
  async (product, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.post("/post/create", product, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPost = createAsyncThunk(
  "auth/getPost",
  async ({ userId }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.get(`/post/get-post?userId=${userId}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_post = createAsyncThunk(
  "auth/get_post",
  async (slug, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.get(`/post/get/post/${slug}`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const recentPost = createAsyncThunk(
  "auth/recentPost",
  async (slug, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.get(`/post/get-post?limit=3`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "auth/getSinglePost",
  async (postId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.get(`/post/get/${postId}`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPosts = createAsyncThunk(
  "auth/getPosts",
  async (_, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.get(`/post/getposts`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_post = createAsyncThunk(
  "auth/update_post",
  async (
    { postId, userId, state },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    console.log(postId, userId, state);
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.put(
        `/update-post/${postId}/${userId}`,
        state,
        config
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_post = createAsyncThunk(
  "auth/delete_post",
  async (
    { userId, postId },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.delete(
        `/post/delete/${postId}/${userId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  successMessage: "",
  errorMessage: "",
  loading: false,
  posts: [],
  post: {},
};

const postReducer = createSlice({
  name: "post",
  initialState,
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(addPost.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error;
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
        state.post = payload.post;
      })
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getPost.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload;
      })
      .addCase(getPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
        state.posts = payload.post;
      })
      .addCase(getSinglePost.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getSinglePost.rejected, (state, { payload }) => {
        state.loading = false;
        // state.errorMessage = payload.error;
      })
      .addCase(getSinglePost.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.successMessage = payload.message;
        state.post = payload.post;
      })
      .addCase(delete_post.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(delete_post.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error;
      })
      .addCase(delete_post.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
      })
      .addCase(update_post.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(update_post.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error;
      })
      .addCase(update_post.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
        state.post = payload.updatePost;
      })
      .addCase(get_post.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(get_post.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error;
      })
      .addCase(get_post.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
        state.post = payload.post;
      })
      .addCase(recentPost.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(recentPost.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error;
      })
      .addCase(recentPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
        state.posts = payload.post;
      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getPosts.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
        state.posts = payload.posts;
      });
  },
});

export const { messageClear } = postReducer.actions;

export default postReducer.reducer;
