import blogReducer from "./blogReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  blogReducer,
});

export default rootReducer;
