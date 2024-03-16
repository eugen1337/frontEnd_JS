import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { thunk } from "redux-thunk";

export default configureStore({
    reducer: rootReducer,
    // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});
