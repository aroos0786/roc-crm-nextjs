import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  REMOVE_MESSAGE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  LOGOUT
} from "../actions/types";

const initialState = {
  loading: true,
  user: null,
  isAuthenticated: false, 
  error: "",
  message: "",
  isLoginAuthenticated: false,
  LoginError: "",
  LoginMessage: ""
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };

    case REGISTER_SUCCESS:
      // case LOGIN_SUCCESS:
      // localStorage.setItem('user', JSON.stringify(payload.data[0]));
      return {
        ...state,
        // ...payload,
        isAuthenticated: true,
        loading: false,
        error: "",
        message: payload
      };
    case REGISTER_FAIL:
      //   case LOGIN_FAIL:
      //   case LOGOUT:
      //localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: payload,
        message: ""
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        // ...payload,
        isLoginAuthenticated: true,
        loading: false,
        LoginError: "",
        user: payload,
        LoginMessage: payload.message
      };
    //case REGISTER_FAIL:
    case LOGIN_FAIL:
    case UPDATE_USER_FAIL:
      // localStorage.removeItem("user");

      return {
        ...state,
        user: null,
        isLoginAuthenticated: false,
        loading: false,
        LoginError: payload,
        LoginMessage: ""
      };
    case REMOVE_MESSAGE:
      return {
        ...state,
        message: "",
        error: "",
        LoginError: ''
      };
    case UPDATE_USER_SUCCESS:
      // localStorage.setItem("user", JSON.stringify(payload.data[0]));
      return {
        ...state,
        user: payload.data[0]
      };

    case LOGOUT:
      localStorage.removeItem("user");
      // localStorage.removeItem("wishlistItem");
      // localStorage.removeItem("cartTotal");
      // localStorage.removeItem("cartItem");
      return {
        ...state,
        user: null,
        isLoginAuthenticated: false,
        loading: false,
        LoginError: payload,
        LoginMessage: ""

      };
    default:
      // const userData = JSON.parse(localStorage.getItem("user"));
      return {
        ...state,

      };
  }
}
