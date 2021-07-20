import axios from "axios";
import { BASE_URI, SERVER_URI } from "../components/utils/config";
import { LOGIN_SUCCESS, LOGIN_FAIL, REMOVE_MESSAGE, LOGOUT } from "./types";
import cookie from "js-cookie";
export const login = (data, rememberMe) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Requested-With": "XMLHttpRequest",
    },
  };

  // Login...
  await axios
    .post(`${SERVER_URI}api/login`, data, config)
    .then((res) => {
     
      if (res.data.status !== "Success") {
        dispatch({
          type: LOGIN_FAIL,
          payload: res.data.message,
        });

        setTimeout(() => dispatch({ type: REMOVE_MESSAGE }), 3000);
      } else {
        if (rememberMe) {
          cookie.set("token", res.data.token, { expires: 365 ,  path: window.location.href, domain: BASE_URI});
          cookie.set("roleid",res.data.role_id, { expires: 365 ,  path: window.location.href, domain: BASE_URI});
          cookie.set("userID", res.data.user_id, { expires: 365 ,  path: window.location.href, domain: BASE_URI});
          cookie.set("user", res.data, { expires: 365, path: window.location.href, domain: BASE_URI },);
        } else {
          cookie.set("token", res.data.token);
          cookie.set("roleid", res.data.role_id);
          cookie.set("userID", res.data.user_id);
          cookie.set("user", res.data);
        }
         window.location.href = ""
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((err) =>
      dispatch({
        type: LOGIN_FAIL,
        payload: "Wrong Email and Password!",
      })
    );
};

// Logout / Clear Profile
export const logout = (token) => async (dispatch) => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
      "X-Requested-With": "XMLHttpRequest",
    },
  };
  

  try {
    const res = await axios.post(`${SERVER_URI}api/admin/logout`, null, config);
    if (res.data.status == "Success") {
      dispatch({
        type: LOGOUT,
      });
      cookie.remove("token", { path: window.location.href, domain: BASE_URI });
      cookie.remove("user", { path: window.location.href, domain: BASE_URI });

      setTimeout(() => dispatch({ type: REMOVE_MESSAGE }), 3000);
    }
  } catch (err) {
    console.log("logout fail", err);
  }
};
