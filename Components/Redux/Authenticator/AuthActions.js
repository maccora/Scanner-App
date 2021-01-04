import * as TYPES from './AuthTypes'

export const validateUser = emailAndPassword =>(

    {

        payload: emailAndPassword,
        type: TYPES.VALIDATE_USER

    }

)



