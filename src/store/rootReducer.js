import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import themeReducer from "./reducer/themeReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import postReducer from "./reducer/postReducer";
import userReducer from "./reducer/userReducer";
import commentReducer from "./reducer/commentReducer";

// const persistConfig = { key: "root", storage, version: 1 };

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  user: userReducer,
  comment: commentReducer,
  // theme: themeReducer,
});

export default rootReducer;

// const persistdReducer = persistReducer(persistConfig, rootReducer);

// export default persistdReducer;
