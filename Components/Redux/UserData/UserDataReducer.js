import AlanaData from '../../../AlanaData.json';
import * as TYPES from './UserDataTypes.js'

function findDatabaseUser(userEmail)
{
 
  let databaseIndex = -1
  
  for(let i = 0; i< AlanaData.user_data.length;i++){

      if(AlanaData.user_data[i].email == userEmail)
      {
        databaseIndex = i
      }

  }
 
 
  return databaseIndex

}

function createUser(state,action)
{
  const tempState = state
  AlanaData.user_data.push({"id":action.payload.id,"facebooktoken": action.payload.facebooktoken, 
  "googletoken":action.payload.googletoken,"name":action.payload.name, "email":action.payload.email,
  "userid": action.payload.email,  "password":action.payload.password, "scanhistory":[]})
   
  return state; 

}

function setUserData(state,action)
{
    
      const tempState = state
      const key = action.payload.key
      const value = action.payload.value

      tempState.userData[key] = value
      const newState = tempState

      return newState

}

function readUserFromDatabase(state,action)
{
  const tempState = state
  const index = findDatabaseUser(action.payload)

  if(index == -1)
  {
   
    throw 'Error: user does not exist'
  }
  else{
    
    Object.assign(tempState.userData,AlanaData.user_data[index])
    tempState.currentUserEmail = tempState.userData.email

  }
 
  const newState = tempState 
  return newState;

}

function updateDatabase(state)
{   
 
  Object.assign(AlanaData.user_data[findDatabaseUser(state.userData.email)],state.userData)
 
  return state
}

function deleteDatabaseUser(state,action)
{
      
      const user = action.payload.email

      if(state.currentUserEmail == user)
      {
        alert('user logged in cannot delete itself')
      }
      else{

          AlanaData.user_data.splice(findDataBaseUser(user),1)

      }
    
      return state
}

function logUserIn(state,action)
{
  const tempState = state;
  tempState.currentUserEmail = action.payload
  const newState = tempState
  return newState
}
const USER_STATE = {

  userData:{},
  currentUserEmail: null

}

export default function userDataReducer(state = USER_STATE,action){
  switch (action.type) {

    case TYPES.CREATE_USER:
      return createUser(state,action)
    case TYPES.SET_USER_DATA:
      return setUserData(state,action)
    case TYPES.READ_USER_FROM_DATABASE:
      return readUserFromDatabase(state,action)
    case TYPES.UPDATE_DATABASE:
      return updateDatabase(state)
    case TYPES.DELETE_DATA:
      return deleteDatabaseUser(state,action)
    case TYPES.LOG_USER_IN:
      return logUserIn(state,action)
    default:
      return state
  }
};
