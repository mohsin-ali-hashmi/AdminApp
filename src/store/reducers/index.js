// Root Reducer

import { combineReducers } from "redux";
import authUserReducer from "./authUser";
import OrganizationReduce from "./organizationReducer";

export let rootReducer = combineReducers({
  authUser: authUserReducer,
  fetchOrganization: OrganizationReduce,
});

export default rootReducer;
