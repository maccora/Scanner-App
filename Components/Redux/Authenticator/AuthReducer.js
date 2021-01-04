import * as TYPES from './AuthTypes';
import AlanaData from '../../../AlanaData.json';

function isUser(email,arrayUsers){

    try{

        if(email === null)
        {
            throw "Error user cannot be null, returning a null object"
           
        }

        for(let i = 0; i <arrayUsers.length;i++ )
        {
        
            if(arrayUsers[i].email == email)
            {
           
                return {"index": i, "exists": true}
            }
            else{
             
            }    
        }

        return {"index":null, "exists": false}
    
    }catch(e){

        console.log(e)
        
        return {"index":-1, "exists":false}

    }
}

function validateUser({email:email, password:password},state){
     try{
        
        const tempState = state
        const indexAndResult = isUser(email,AlanaData.user_data)
      
        if(indexAndResult.exists){

            if(AlanaData.user_data[indexAndResult.index].password === password ){

            tempState.existAndValid = {"exists": true, "isValidated": true, "message": "Correct user and password"}
            return tempState

            }

            else{
            
                tempState.existAndValid = {"exists": true, "isValidated": false, "message": "Wrong password"}
                return tempState

            }
        }

        else{

            tempState.existAndValid = {"exists": false, "isValidated": false, "message": " User does not exist"}
            return tempState

        } 
    }catch(e){

        console.log("Exception caught:",e)
        return state

    }    
}

const AUTH_STATE = {
    existAndValid:{},
   
}

export default function AuthReducer(state = AUTH_STATE, action){

    switch(action.type){

        case TYPES.VALIDATE_USER:
            return validateUser({email:action.payload.email,password:action.payload.password},state)
        default:
            return state
    }
}
