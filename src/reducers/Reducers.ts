import { combineReducers } from "redux";
import PageHeaderReducer from "./PageHeaderReducer";

const Reducers = combineReducers({
    pageHeader: PageHeaderReducer
});

export default Reducers;