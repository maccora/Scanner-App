import { combineReducers } from 'redux';

import userDataReducer from '../Redux/UserData/UserDataReducer.js';
import scanDataReducer from '../Redux/ScanData/ScanDataReducer.js';
import authReducer     from '../Redux/Authenticator/AuthReducer.js';


export default rootReducer = combineReducers({

 userDataReducer,
 scanDataReducer,
 authReducer,

 })
