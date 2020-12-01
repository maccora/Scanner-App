import React, { useEffect } from 'react';
import {View, TouchableHighlight, Image, Text, StyleSheet} from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

import AlanaData from '../AlanaData.json'

export default function SocialLogin({navigation}){

    function isUser(email,arrayUsers){

        for(let i = 0; i <arrayUsers.length;i++ )
        {
            
            if(arrayUsers[i].email == email)
            {
               
                return {"index": i, "exists": true}
            }
            else{
                 
            }
            
        }
        
         return {"index": null, "exists": false}
  }

      async function handleGoogleLogIn(){
        
        try {
            const { type, accessToken, user } = await Google.logInAsync({
              androidClientId: "619558873996-n2eegk09hfbi2403677sujmcjqlaoo39.apps.googleusercontent.com",
              iosClientId: "619558873996-0h4ak9dovbmtpaalmngq2dsvtso3sc5p.apps.googleusercontent.com",
            });
         
             data=  { type, token: accessToken, user};
           
             if(data.type == 'success' && isUser(data.user.email, AlanaData.users).exists)
             {
                alert("normal")
                
                navigation.navigate("TabNavigator")
              
             }
             else if(data.type == 'success' && !isUser(data.user.email, AlanaData.users).exists){
                 AlanaData.users.push({"id": AlanaData.users.length+1, "token":data.token, "name": data.name, "email": data.user.email, "userID":data.email,"password": null})
                 
                
                 navigation.navigate("TabNavigator")
                 alert("pushed")
             }
             else{
                 alert("failed or cancelled")
             }
     
           
          } catch (e) {
            return { error: e };
          }
      }
        

      async function handleFaceBookLogIn() {
        try {
          await Facebook.initializeAsync(
            {appId: '2911287265809854'}
          );
          data = {
            type,
            token,
            expirationDate,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile','email'],
          });
           fields = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name`)
           user = await fields.json()
          } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
          }  
         
          if (data.type === 'success' && isUser(user.email, AlanaData.users).exists) {
            
            navigation.navigate("TabNavigator")
            alert('normal')
          }
          else if(data.type === 'success' && !isUser(user.email, AlanaData.users).exists){

            AlanaData.users.push({"id": AlanaData.users.length+1, "token":user.token, "name": user.name, "email": user.email, "userID": user.email,"password": null})
           
            navigation.navigate("TabNavigator")
            alert("pushed")

          }
          else{
              alert("failed or cancelled")
          }
       
      }
    return(
        
        <View style = {{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>

            <TouchableHighlight style = {{margin: 5}}onPress = {handleGoogleLogIn}>
                <Image source = {require('../assets/favicon.png')}/>
            </TouchableHighlight>

            <TouchableHighlight  style = {{margin: 5}} onPress = {handleFaceBookLogIn}>
                <Image source = {require('../assets/favicon.png')}/>
            </TouchableHighlight>
        </View>
        
    )

}
