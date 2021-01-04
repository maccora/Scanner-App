import React,{useState, useRef} from 'react';
import {View, StyleSheet,TextInput,Button, Modal} from 'react-native';

import RegisterUserModal from './RegisterUserModal';
import AlanaData from '../AlanaData.json';


export default function RegistrationForm({navigation, reducers, reducerActions}){

    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [showRegister, setRegister] = useState(false);
    
    function handleLogIn()
    {   
        reducerActions.validateUser({email:email, password:password})
        const userValidation = reducers.authReducer.existAndValid
    
        if(userValidation.isValidated)
        {

            reducerActions.logUserIn(email)
            reducerActions.readUserFromDatabase(email)
            navigation.navigate("TabNavigator")

        }
        else{
            alert(userValidation.message)
        }
    
    }
    
    function register()
    {
        modalRef.toggleVisible()
    }
    return(

        <View style = {styles.container}>
             
                <View style = {{flex:1,alignItems: 'center', justifyContent: 'center'}}>

                    <TextInput 

                        style  = {{height: 40,width:200, borderBottomWidth: 2.5,}}  
                        onChangeText = {text => setEmail(text)} 
                        textAlign = {"center"}
                        value = {email}
                        clearTextOnFocus = {true}
                        placeholder = {"Email"}/>

                    <TextInput 
                                      
                        style = {{height: 40, width:200,}}
                        onChangeText = {text => setPass(text)} 
                        textAlign = {"center"}
                        value = {password} 
                        clearTextOnFocus = {true} 
                        secureTextEntry = {true}
                        placeholder = {"Password"}/>
               
                </View>
                <View style = {{flex:2, flexDirection: 'row', justifyContent:'center', alignContent:'center'}}>
                    <View style = {{justifyContent:'center', alignContent:'center', margin:10,}}>
                        
                        <Button title = "Log In"onPress = {()=>{handleLogIn()}}/>
                    </View>
                    <View style = {{justifyContent:'center', alignContent:'center', margin:10}}>
                        <Button title = "Register"onPress = {()=>{register()}}/>
                    </View>  
                </View> 
                <View>
                    <RegisterUserModal ref = {ref=> {modalRef = ref}} reducerActions = {reducerActions} reducers = {reducers}/>
                </View>    
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
