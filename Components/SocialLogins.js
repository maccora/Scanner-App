import React from 'react';
import {View, TouchableHighlight, Image, StyleSheet} from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as Random from 'expo-random';

import AlanaData from '../AlanaData.json';

export default function SocialLogin({navigation, reducers, reducerActions}){
  
  function generateID()
  {
   
    const ID = Random.getRandomBytes(24).toString()
    AlanaData.user_data.forEach((element)=>{
    
        if(element.id == ID)
        {
          ID = Random.getRandomBytes(24).toString()
        }

    })
    
    return ID
  }
  
  function userExists(user){
    
  
   let result = {"index": null, "result": false}
   
    AlanaData.user_data.forEach((element, index) =>{
     
        if(user.email === element.email)
        {
         
         result =  {"index":index, "result": true}
        }

    })
    
     return  result
}

  async function googleLogIn(){
        
    try {
      const { type, accessToken, user } = await Google.logInAsync({
              androidClientId: "619558873996-n2eegk09hfbi2403677sujmcjqlaoo39.apps.googleusercontent.com",
              iosClientId: "619558873996-0h4ak9dovbmtpaalmngq2dsvtso3sc5p.apps.googleusercontent.com",
            });
             
      const userData =   { "id": generateID(),type  ,"googletoken":accessToken,
      "facebooktoken": null, "password": "password" , "email": user.email, "name": user.name,"password": null};
             
      const inDatabase = userExists(userData)
     
      if(userData.type == 'success' && inDatabase.result == true){
      
        //sets the current state of the userDataReducer to user if they are both an existing user and the token matches

        reducerActions.readUserFromDatabase(userData.email)
 
        if(reducers.userDataReducer.userData.googletoken === null)
        {
        
          reducerActions.setUserData({"key":"googletoken", "value": userData.googletoken})
    
          reducerActions.updateDatabase()
     
        }
        navigation.navigate("TabNavigator")
              
      }
             
      else if(userData.type === 'success' && inDatabase.result == false){
         
         
          reducerActions.createUser(userData)
         
          reducerActions.readUserFromDatabase(userData.email)
    
          navigation.navigate("TabNavigator")
     
          }
          
          } catch (e) {
            return { error: e };
          }
      }
     
  async function faceBookLogIn() {
    try {
      await Facebook.initializeAsync(
            {appId: '2911287265809854'}
          );
      const {
            type,
            token,
            expirationDate,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile','email'],
          })
  
      const fields = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name`)
      const fetchedUserInfo =  await fields.json() 

      const userData = {"id": generateID(),"facebooktoken":token,"googletoken":null,"password": "password",
      "email": fetchedUserInfo.email, "name": fetchedUserInfo.name,"type":type}
      
      const inDatabase = userExists(userData)
   
      if (userData.type === 'success' && inDatabase.result == true) {
          
       
        if(reducers.userDataReducer.userData.facebooktoken == null)
        {
          reducerActions.setUserData({"key":"facebooktoken", "value": userData.facebooktoken})
        
          reducerActions.updateDatabase()

        
        }

        navigation.navigate("TabNavigator")
   
      }
      else if(userData.type === 'success' && inDatabase.result == false){

        
         
          reducerActions.createUser(userData)
          reducerActions.readUserFromDatabase(userData.email)
          
          navigation.navigate("TabNavigator")
            
      }
      else{
         
          }
      } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }  
      } 
     
    return(
        
        <View style = {{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
          
            <TouchableHighlight style = {{margin: 30}}onPress = {googleLogIn}>
                <Image source = {require('../assets/favicon.png')}/>
            </TouchableHighlight>
            <TouchableHighlight  style = {{margin: 30}} onPress = {faceBookLogIn}>
                <Image source = {require('../assets/favicon.png')}/>
            </TouchableHighlight>
            
        </View>
        
    )

}
