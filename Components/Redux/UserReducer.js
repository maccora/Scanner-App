import { combineReducers } from 'redux';
import AlanaData from '../../AlanaData.json';

const INITIAL_STATE = {
  userData: [],
 
  
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case('ADD_USER'):
      const {current,possible} = state;
      userData.push({"name":action.payload.name, "email":action.payload.email,"userID": action.payload.email, "token": action.payload.token})
      const newState= {current, possible};
      return newState;

    default:
      return state
  }
};

export default combineReducers({
  users: userReducer
});
