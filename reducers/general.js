import {
  GET_ALL_TIMEZONE_SUCCESS,
  GET_ALL_TIMEZONE_FAIL,
  GET_ALL_CURRENCY_FAIL,
  GET_ALL_CURRENCY_SUCCESS,
  FULL_SCREEN_MODE_FAIL,
  FULL_SCREEN_MODE_SUCCESS,
  TOGGLE_SIDEBAR,
  GET_ALL_IMAGES,
  GET_IMAGES_DATA_ZERO,
  GET_SINGLE_IMAGES_ERROR,
  GET_SINGLE_IMAGES_SUCESS,
  GET_SINGLE_UNIT,
  GET_ALL_UNIT,
  EMPTY_SINGLE_UNIT,
  UNIT_ERROR_HANDLING,
  EMPTY_SINGLE_CATAGORY,
  CATEGORY_ERROR_HANDLING,
  GET_SINGLE_CATAGORY,
  GET_SLIDER_NAVIGATION_ID_ERROR,
  GET_SLIDER_NAVIGATION_ID_SUCCESS,
  GET_SLIDER_TYPE_ERROR,
  GET_SLIDER_TYPE_SUCCESS,
  GET_GALLARY_SETTINGS_SUCCESS,
  EMPTY_SINGLE_ATTRIBUTE,
  GET_SINGLE_ATTRIBUTE,
  EMPTY_SINGLE_VARIATION,
  GET_SINGLE_PRODUCT,
  EMPTY_SINGLE_PRODUCT,
  GET_SINGLE_VARIATION,
  GET_ALL_STATE,
  GET_ALL_COUNTRY,
  GET_ALL_CATAGORY,
  BILLER_ERROR,
  GET_SINGLE_SHIPPING_METHODE,
  EMPTY_SINGLE_SHIPPING_METHODE,
  ALL_VARIANTS,
  SELECTED_VARIATION,
  
} from "../actions/types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  all_timezone: [],
  all_units: [],
  all_category: [],
  all_timezone_server_msg: "",
  attributes_array: [],
  all_currency: [],
  all_country: [],
  all_state: [],
  all_images: [],
  image_detail: [],
  
  slider_types: [],
  slider_navigations: [],
  all_variants: [],
  selected_variation: [],
  media_settings: [],
  single_unit_detail: {},
  single_category_detail: {},
  single_attribute_detail: {},
  single_shipping_method_detail: {},
  single_variation_detail: {},
  single_product_detail: {},
  image_detail_msg: "",
  unit_error: "",
  category_error: "",
  all_currency_server_msg: "",
  fullScreenMode: false,
  toggle_sidebar: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // case HYDRATE:
    //         // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //         return {...state, ...payload};
    case GET_ALL_TIMEZONE_SUCCESS:
      return {
        ...state,
        all_timezone: payload,
      };
    case GET_ALL_TIMEZONE_FAIL:
      return {
        ...state,
        all_timezone_server_msg: payload,
      };

    case GET_ALL_CURRENCY_SUCCESS:
      return {
        ...state,
        all_currency: payload,
      };
    case GET_ALL_CURRENCY_FAIL:
      return {
        ...state,
        all_currency_server_msg: payload,
      };
    case FULL_SCREEN_MODE_SUCCESS:
      return {
        ...state,
        fullScreenMode: payload,
      };
     
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        toggle_sidebar: state.toggle_sidebar === true ? false : true,
      };
    case GET_ALL_IMAGES:
      return {
        ...state,
        all_images: payload,
      };
    case GET_IMAGES_DATA_ZERO:
      return {
        ...state,
        all_images: [],
      };
    case GET_SINGLE_IMAGES_SUCESS:
      return {
        ...state,
        image_detail: payload,
      };
    case GET_SINGLE_IMAGES_ERROR:
      return {
        ...state,
        image_detail_msg: payload,
      };
    case GET_SINGLE_UNIT:
      return {
        ...state,
        single_unit_detail: payload,
      };
    case EMPTY_SINGLE_UNIT:
      return {
        ...state,
        single_unit_detail: {},
      };
    case GET_SINGLE_ATTRIBUTE:
      return {
        ...state,
        single_attribute_detail: payload,
      };
    case EMPTY_SINGLE_ATTRIBUTE:
      return {
        ...state,
        single_attribute_detail: {},
      };
    case GET_SINGLE_VARIATION:
      return {
        ...state,
        single_variation_detail: payload,
      };
    case EMPTY_SINGLE_VARIATION:
      return {
        ...state,
        single_variation_detail: {},
      };
    case GET_SINGLE_SHIPPING_METHODE:
      return {
        ...state,
        single_shipping_method_detail: payload,
      };
    case EMPTY_SINGLE_SHIPPING_METHODE:
      return {
        ...state,
        single_shipping_method_detail: {},
      };
    case GET_SINGLE_CATAGORY:
      return {
        ...state,
        single_category_detail: payload,
      };
    case EMPTY_SINGLE_CATAGORY:
      return {
        ...state,
        single_category_detail: {},
      };

    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        single_product_detail: payload,
      };
    case ALL_VARIANTS:
      return {
        ...state,
        all_variants: payload,
      };
    case SELECTED_VARIATION:
      const { name, values, attributes, id } = payload;
      let newState = { ...state.selected_variation };
      if (name in newState) {
        newState[name] = values ;
        // newState[name] = { id: id, value: values };
      } else {
        newState[name] = values ;
        // newState[name] = { id: id, value: values };
      }
      return {
        ...state,
        selected_variation: newState,
        attributes_array: attributes,
      };
    case EMPTY_SINGLE_PRODUCT:
      return {
        ...state,
        single_product_detail: {},
      };
    case UNIT_ERROR_HANDLING:
      return {
        ...state,
        unit_error: payload,
      };
    case CATEGORY_ERROR_HANDLING:
      return {
        ...state,
        category_error: payload,
      };

    case GET_SLIDER_TYPE_SUCCESS:
      return {
        ...state,
        slider_types: payload,
      };
    case GET_SLIDER_NAVIGATION_ID_SUCCESS:
      return {
        ...state,
        slider_navigations: payload,
      };
    case GET_GALLARY_SETTINGS_SUCCESS:
      return {
        ...state,
        media_settings: payload,
      };
    case GET_ALL_COUNTRY:
      return {
        ...state,
        all_country: payload,
      };
    case GET_ALL_STATE:
      return {
        ...state,
        all_state: payload,
      };
    case GET_ALL_UNIT:
      return {
        ...state,
        all_units: payload,
      };
    case GET_ALL_CATAGORY:
      return {
        ...state,
        all_category: payload,
      };
    default:
      return state;
  }
}
