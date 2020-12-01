import React,{useState} from 'react';
import {View, Text, StyleSheet,TextInput,Button} from 'react-native';
import { set } from 'react-native-reanimated';

import AlanaData from '../AlanaData.json';

export default  RegistrationForm = ({navigation}) =>{
    const [email, setEmail] = useState(null);
    const [passWord, setPass] = useState(null);
    const [showRegister, setShow] = useState(false)
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
    const submitForm = ()=>
    {
            setShow(!showRegister)
            const userData = isUser(email,AlanaData.users)
            if(!userData.exists)
            {
                AlanaData.users.push({"email": email, "password": passWord })
            }
            
                 
    }
    function validateForm()
    {
        console.log(email,passWord)
        let userData = isUser(email,AlanaData.users)
        console.log(userData)
        if(userData.exists && AlanaData.users[userData.index].passWord == passWord )
        {
            alert("true")
            return {"type": "success", "validated": true}
        }
        else if(!userData.exists){

            alert("User does not exist")  
            return {"type": "null", "validated": false}

        }
        else{
            
            alert("Incorrect password or email")
            return {"type": "mismatch","validated": false}
            
        }
    }
    function handleLogIn()
    {
        const isValid = validateForm()
        //console.log(isValid)
        if(isValid.validated)
        {
            navigation.navigate("TabNavigator", {"userID": user.email})
        }
        else{
            
        }
    }
             
    return(

        <View style = {styles.container}>
             
             {showRegister?
                <View style = {{flex:1,alignItems: 'center', justifyContent: 'center'}}>
                    <TextInput  onChangeText = {text => setEmail(text)} value = {email}clearTextOnFocus = {true} placeholder = {"Phone Number or Email"}/>
                    <TextInput  onChangeText = {text => setPass(text)} value = {passWord} clearTextOnFocus = {true} placeholder = {"Password"}/>
                    <Button title = "Register"onPress = {()=>{submitForm}}/>
                   
                </View>
                    :
                <View style = {{flex:1,alignItems: 'center', justifyContent: 'center'}}>
                    <TextInput  onChangeText = {text => setEmail(text)} value = {email}clearTextOnFocus = {true} placeholder = {"Phone Number or Email"}/>
                    <TextInput  onChangeText = {text => setPass(text)} value = {passWord}clearTextOnFocus = {true}placeholder = {"Password"}/>
                    <Button title = "Log In"onPress = {()=>{handleLogIn}}/>
                
                </View>}
         
        </View>

    )
    
        


    

}

const styles = StyleSheet.create({

   
    container:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
      
    },
    input:{

       
        flex:1,
        alignContent: 'center',
        justifyContent: 'center',
        

    },
    

})
