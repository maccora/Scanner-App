import * as TYPES from './UserDataTypes.js'

export const createUser = userInfo => (

    {

      type: TYPES.CREATE_USER,
      payload: userInfo,

    }

  )

export const setUserData = keyAndValueObject => (

  {

    type: TYPES.SET_USER_DATA,
    payload: keyAndValueObject

  }

)

export const readUserFromDatabase = userEmail => (

  {

    type: TYPES.READ_USER_FROM_DATABASE,
    payload: userEmail,

  }

)

export const updateDatabase = () =>(

  {
  
    type:TYPES.UPDATE_DATABASE,
   
  }

)

export const deleteDataBaseUser = userToDelete => (

  {

      type: TYPES.DELETE_DATABASE_USER,
      payload: userToDelete

  }

)

export const logUserIn = email=> (

  {

      type: TYPES.LOG_USER_IN,
      payload: email

  }

)
