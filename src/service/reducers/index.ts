import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import UserReducer from "./userReducer";
import ManageReducer from "./manageReducer";
import CategoryReducer from "./categoryReducer";
import InformationReducer from "./informationReducer";
import LandingReducer from "./landingReducer";
import SubmissionReducer from "./submissionReducer";
import HistoryReducer from "./historyReducer";

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  manage: ManageReducer,
  category: CategoryReducer,
  information: InformationReducer,
  landing: LandingReducer,
  submission: SubmissionReducer,
  history: HistoryReducer,
});
