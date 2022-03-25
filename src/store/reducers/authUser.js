import { LOGIN, LOGOUT, UPDATE_PROFILE , SIGNUP } from "../constants/types";

const initialState = {
  
    username: null,
    uid: null,
};

/*
    Any action related to Profile will go here.
*/

export default function authUserReducer(
  state = initialState,
  { type, payload }
) {
   
  switch (type) {
    case LOGIN:
      return {
        ...state,
        username: payload,
        uid: payload.id,
        
      };
    case LOGOUT:
      localStorage.removeItem("auth");
      return {
       
        ...state,
        username: null,
        uid: null,
      };
    case UPDATE_PROFILE:
      // For Example, any thing
      return {
        ...state,
        user: payload,
      };
      case SIGNUP:
      return{
          ...state,
          username: payload,
      }
    default:
      return { ...state };
  }
}
