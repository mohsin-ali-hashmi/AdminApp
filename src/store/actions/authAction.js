import { LOGIN, LOGOUT , SIGNUP } from "../constants/types";
import firebase from "../../config/firebase";

// export const login = () => async (dispatch) => {
//   dispatch({
//     type: LOGIN,
//     payload: {name: "abcdefghhi"},
//   });
// };


export const login = (credentials) => {
  console.log("creds", credentials);
  return (dispatch) => {
    dispatch({
      type: LOGIN,
    });
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((data) => {
        console.log(data.user.uid);
        firebase
          .firestore()
          .collection("users")
          .doc(data.user.uid)
          .onSnapshot((doc) => {
            console.log(doc.data());
            var tempUser = {};
            tempUser = { id: doc.id, ...doc.data() };
            dispatch({
              type: "LOGIN_SUCCESS",
              user: tempUser,
              error: "",
            });
            // window.location.pathname = "/index";
            dispatch({
              type: "ACTION_REQUEST_END",
            });
          });
      })
      .catch((error) => {
        dispatch({
          type: "LOGIN_FAIL",
          uid: "",
          error: error,
        });
        dispatch({
          type: "ACTION_REQUEST_END",
        });
        alert(error, "danger");
      });
  };
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};


export const signup = (user) => async (dispatch) => {
  return{
    type: SIGNUP,
    payload: user,
  }
};