import { combineReducers } from 'redux';
import auth from './auth';
import settings from './settings';
 import general from './general';
export default combineReducers({

 auth,
 settings,
 general
 
});
