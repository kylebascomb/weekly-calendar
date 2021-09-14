import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import eventReducer from "./eventReducer";
export default combineReducers({
   auth: authReducer,
   event: eventReducer,
   errors: errorReducer
});