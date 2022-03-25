import { FETCH_ORGANIATIONS } from "../constants/types";
import * as api from '../api/index.js';


  export const getPosts = () => async (dispatch) => {
    try {
      const { data } = await api.fetchOrganizations();
  
      dispatch({ type: FETCH_ORGANIATIONS, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };