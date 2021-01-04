import React, {Component} from 'react'
import {View, Text, TextInput, Button,Modal} from 'react-native'

export default class RegisterUserModal extends Component {
    constructor (props) {
        super(props);
     
        this.state = {
        isVisible: false,
        email: "",
        confirmEmail:"",
        password:"",
        confirmPassword:"",
        passwordMatches:true,
        emailMatches:true,
        reducers: this.props.reducers,
        reducerActions: this.props.reducerActions,
      };

        this.submitForm = this.submitForm.bind(this)
        this.clearForm = this.clearForm.bind(this)
        this.toggleVisible = this.toggleVisible.bind(this);
        this.verifyEmails = this.verifyEmails.bind(this);
        this.verifyPasswords = this.verifyPasswords.bind(this);
    
    }
 
    clearForm(){

        this.setState({
            
            password: "",
            email:"",
            confirmPassword:"",
            confirmEmail:"",
            
        })

    }

    toggleVisible()
    {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }
    
    verifyEmails()
    {

        this.setState({
            emailMatches: this.state.email === this.state.confirmEmail
        })
        
    }

    verifyPasswords()
    {
       this.setState({
           passwordMatches: this.state.password === this.state.confirmPassword,
       })
      
    }  

    submitForm()
    {
        if(this.state.email.length === 0|| this.state.password.length === 0)
        {
            return alert("Email or password cannot be empty")
        }
        else if(this.state.emailMatches === true && this.state.passwordMatches === true){

            this.state.reducerActions.validateUser({email:this.state.email, password:this.state.password})
            

            if(this.state.reducers.authReducer.existAndValid.exists === false){

            this.state.reducerActions.createUser({"id":null,"facebooktoken": null, 
            "googletoken":null,"name":null, "email":this.state.email,"password":this.state.password,})
           
                        
            }
            else{

                alert('The user already exists')
                
            } 
            this.clearForm()
            this.toggleVisible()
          
        }
        
        
    }
    
    
   
  
    render () {
        return (
            <Modal  animationType = {"slide"} visible = {this.state.isVisible}>
                <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <View style = {{flex:1, justifyContent:'center', alignContent:'center'}}>
                        {this.state.emailMatches?null: <Text> The emails entered do not match </Text>}
                        <TextInput 
                   
                            style  = {{height: 40,width:200, borderBottomWidth: 2.5,}}  
                            onChangeText = {text=> this.setState({email:text})}   
                            value = {this.state.email}
                            textAlign = {"center"}
                            clearTextOnFocus = {true}
                            placeholder = {"Email"}/>

                        <TextInput   
                                   
                            style = {{height: 40, width:200,}}
                            onChangeText = {text =>  this.setState({confirmEmail: text})}
                            value = {this.state.confirmEmail}
                            onEndEditing = {()=>this.verifyEmails()}
                            textAlign = {"center"}                   
                            clearTextOnFocus = {true} 
                            placeholder = {"Email"}/>
                       
                    </View>
                   
                    <View style = {{flex:1, justifyContent:'center', alignContent:'center'}}>
                        {this.state.passwordMatches?null: <Text> The passwords entered do not match </Text>}
                        <TextInput 
                          
                            style  = {{height: 40,width:200, borderBottomWidth: 2.5,}}  
                            onChangeText = {text => this.setState({password:text})} 
                            value = {this.state.password}                           
                            textAlign = {"center"}                                          
                            secureTextEntry = {true}                       
                            placeholder = {"Password"}/>

                        <TextInput    
                                             
                            style = {{height: 40, width:200,}}
                            onChangeText = {text => this.setState({confirmPassword:text})} 
                            value = {this.state.confirmPassword}
                            onEndEditing = {()=>this.verifyPasswords()}
                            textAlign = {"center"}                
                            clearTextOnFocus = {true} 
                            secureTextEntry = {true}
                            placeholder = {"Password"}/>
                    </View>
                    <View style = {{flex:1, justifyContent:'center', alignContent:'center'}}>

                        <Button title = "Submit" onPress= {()=>this.submitForm()}/>

                        <Button title = "Go Back" onPress= {()=>this.toggleVisible()}/>

                    </View>
                </View>   
            </Modal>
        );
    }
}
