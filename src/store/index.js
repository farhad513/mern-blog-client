import { configureStore } from "@reduxjs/toolkit";
import persistdReducer from "./rootReducer";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: true,
});

// const

// const persist = persistStore(store);

export default store;
