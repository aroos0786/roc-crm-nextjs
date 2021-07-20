import {
  GET_EMAIL_SMTP_SETTINGS_FAIL,
  GET_EMAIL_SMTP_SETTINGS_SUCCESS,
  GET_SMS_SETTINGS_FAIL,
  GET_SMS_SETTINGS_SUCCESS,
  GET_INVOICE_SETTINGS_FAIL,
  GET_INVOICE_SETTINGS_SUCCESS,
  GET_BARCODE_SETTINGS_FAIL,
  GET_BARCODE_SETTINGS_SUCCESS,
  GET_WEBSITE_GENERAL_SETTINGS_FAIL,
  GET_WEBSITE_GENERAL_SETTINGS_SUCCESS,
  GET_SEO_SETTINGS_FAIL,
  GET_SEO_SETTINGS_SUCCESS,
  GET_MEDIA_SETTINGS_FAIL,
  GET_MEDIA_SETTINGS_SUCCESS,
  GET_LOGIN_SIGNUP_SETTINGS_FAIL,
  GET_LOGIN_SIGNUP_SETTINGS_SUCCESS,
  GET_APP_GENERAL_SETTINGS_FAIL,
  GET_APP_GENERAL_SETTINGS_SUCCESS,
  GET_LANGUAGE_FAIL,
  GET_LANGUAGE_SUCCESS,
  GET_BUSINESS_GENERAL_SETTINGS_FAIL,
  GET_BUSINESS_GENERAL_SETTINGS_SUCCESS,
  GET_ALL_EMAIL_TEMPLATE_FAIL,
  GET_ALL_EMAIL_TEMPLATE_SUCCESS,
  GET_BUSINESS_NOTIFCATION_SETTING_FAIL,
  GET_BUSINESS_NOTIFCATION_SETTING_SUCCESS,
  GET_APP_LOGIN_SIGNUP_SETTINGS_FAIL,
  GET_APP_LOGIN_SIGNUP_SETTINGS_SUCCESS,
  GET_APP_NOTIFICATION_SETTINGS_FAIL,
  GET_APP_NOTIFICATION_SETTINGS_SUCCESS,
  GET_WEB_THEME_SETTINGS_FAIL,
  GET_WEB_THEME_SETTINGS_SUCCESS,
  SET_DEFAULT_LANGUAGE,
  GET_INSIGNTS,
  GET_INSIGNTS_AVG,
  GET_STAT,
  GET_STAT_GRAPH


} from "../actions/types";
import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
const initialState = {
  email_settings: [],
  email_settings_server_msg: "",
  sms_settings: [],
  sms_settings_server_msg: "",
  barcode_settings: [],
  barcode_settings_server_msg: "",
  invoice_settings: [],
  invoice_settings_server_msg: "",
  web_general_settings: [],
  web_general_settings_server_msg: "",
  seo_settings: [],
  all_insights: [],
  all_insightsAvg: [],
  all_stat: [],
  all_stat_graph: [],
  seo_settings_server_msg: "",
  media_settings: [],
  mdeia_settings_server_msg: "",
  web_login_singup_settings: [],
  web_login_singip_settings_server_msg: "",
  app_login_singup_settings: [],
  app_login_singip_settings_server_msg: "",
  app_notification_settings: [],
  app_notification_settings_server_msg: "",
  app_general_settings: [],
  app_general_settings_server_msg: "",
  language_settings: [],
  language_settings_server_msg: "",
  business_general_settings: {},
  business_general_settings_server_msg: "",
  all_email_templates: {},
  all_email_templates_server_msg: "",
  business_notification_settings: {},
  business_notification_settings_server_msg: "",
  web_theme_settings: {},
  web_theme_settings_server_msg: "",
  set_default_language: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // case HYDRATE:
    //         // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //         return {...state, ...payload};
    case GET_EMAIL_SMTP_SETTINGS_SUCCESS:
      return {
        ...state,
        email_settings: payload,
      };
    case GET_EMAIL_SMTP_SETTINGS_FAIL:
      return {
        ...state,
        email_settings_server_msg: payload,
      };

    case GET_SMS_SETTINGS_SUCCESS:
      return {
        ...state,
        sms_settings: payload,
      };
    case GET_SMS_SETTINGS_FAIL:
      return {
        ...state,
        sms_settings_server_msg: payload,
      };
    case GET_INVOICE_SETTINGS_SUCCESS:
      return {
        ...state,
        invoice_settings: payload,
      };
    case GET_INVOICE_SETTINGS_FAIL:
      return {
        ...state,
        invoice_settings_server_msg: payload,
      };
    case GET_BARCODE_SETTINGS_SUCCESS:
      return {
        ...state,
        barcode_settings: payload,
      };
    case GET_BARCODE_SETTINGS_FAIL:
      return {
        ...state,
        barcode_settings_server_msg: payload,
      };

      case GET_WEBSITE_GENERAL_SETTINGS_SUCCESS:
      return {
        ...state,
        web_general_settings: payload,
      };
    case GET_WEBSITE_GENERAL_SETTINGS_FAIL:
      return {
        ...state,
        web_general_settings_server_msg: payload,
      };
      case GET_SEO_SETTINGS_SUCCESS:
      return {
        ...state,
        seo_settings: payload,
      };
      case GET_INSIGNTS:
        return {
          ...state,
          all_insights: payload,
        };
        case GET_STAT:
          return {
            ...state,
            all_stat: payload,
          };
          case GET_STAT_GRAPH:
            return {
              ...state,
              all_stat_graph: payload,
            };
        case GET_INSIGNTS_AVG:
          return {
            ...state,
            all_insightsAvg: payload,
          };
    case GET_SEO_SETTINGS_FAIL:
      return {
        ...state,
        seo_settings_server_msg : payload,
      };
      case GET_MEDIA_SETTINGS_SUCCESS:
      return {
        ...state,
        media_settings: payload,
      };
    case GET_MEDIA_SETTINGS_FAIL:
      return {
        ...state,
        mdeia_settings_server_msg: payload,
      };
      case GET_LOGIN_SIGNUP_SETTINGS_SUCCESS:
      return {
        ...state,
        web_login_singup_settings: payload,
      };
    case GET_LOGIN_SIGNUP_SETTINGS_FAIL:
      return {
        ...state,
        web_login_singip_settings_server_msg: payload,
      };
      case GET_APP_LOGIN_SIGNUP_SETTINGS_SUCCESS:
        return {
          ...state,
          app_login_singup_settings: payload,
        };
      case GET_APP_LOGIN_SIGNUP_SETTINGS_FAIL:
        return {
          ...state,
          app_login_singip_settings_server_msg: payload,
        };
      case GET_APP_GENERAL_SETTINGS_SUCCESS:
      return {
        ...state,
        app_general_settings: payload,
      };
    case GET_APP_GENERAL_SETTINGS_FAIL:
      return {
        ...state,
        app_general_settings_server_msg: payload,
      };
      case GET_LANGUAGE_SUCCESS:
        return {
          ...state,
          language_settings: payload,
        };
      case GET_LANGUAGE_FAIL:
        return {
          ...state,
          language_settings_server_msg: payload,
        };
        case GET_BUSINESS_GENERAL_SETTINGS_SUCCESS:
        return {
          ...state,
           business_general_settings: payload,
        };
      case GET_BUSINESS_GENERAL_SETTINGS_FAIL:
        return {
          ...state,
          business_general_settings_server_msg: payload,
        };
        case GET_ALL_EMAIL_TEMPLATE_SUCCESS:
          return {
            ...state,
            all_email_templates: payload,
          };
        case GET_ALL_EMAIL_TEMPLATE_FAIL:
          return {
            ...state,
            all_email_templates_server_msg: payload,
          };
          case GET_BUSINESS_NOTIFCATION_SETTING_SUCCESS:
            return {
              ...state,
              business_notification_settings: payload,
            };
          case GET_BUSINESS_NOTIFCATION_SETTING_FAIL:
            return {
              ...state,
              business_notification_settings_server_msg: payload,
            };
            case GET_APP_NOTIFICATION_SETTINGS_SUCCESS:
              return {
                ...state,
                app_notification_settings: payload,
              };
            case GET_APP_NOTIFICATION_SETTINGS_FAIL:
              return {
                ...state,
                app_notification_settings_server_msg: payload,
              };

              case GET_WEB_THEME_SETTINGS_SUCCESS:
                return {
                  ...state,
                  web_theme_settings: payload,
                };
              case GET_WEB_THEME_SETTINGS_FAIL:
                return {
                  ...state,
                  web_theme_settings_server_msg: payload,
                };
                case SET_DEFAULT_LANGUAGE:
                  return {
                    ...state,
                    set_default_language: payload,
                  };
    default:
      return state;
  }
}
