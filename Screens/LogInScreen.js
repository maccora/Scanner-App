import React from 'react';
import {View, StyleSheet} from 'react-native';

import SocialLogin from '../Components/SocialLogins.js';
import RegistrationForm from '../Components/RegistrationForm.js';
export default function LogInScreen({navigation,route}){

    return(

        <View style = {styles.main}> 
            
           
                <RegistrationForm/>
                <SocialLogin navigation= {navigation} route = {route}/>
           

         </View>       

    )

}

const styles = StyleSheet.create({

    main:{
        flex:1, 
        justifyContent: 'center',
        alignContent: 'center',
 
    
    
    
    
    },




})
