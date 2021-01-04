import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as dataActions from '../Components/Redux/UserData/UserDataActions';
import * as authActions from '../Components/Redux/Authenticator/AuthActions';
import SocialLogin from '../Components/SocialLogins.js';
import RegistrationForm from '../Components/RegistrationForm.js';

 function LogInScreen(props){

    const reducers = {

      authReducer: props.authReducer,
      userDataReducer: props.userDataReducer,
      scanDataReducer: props.scanDataReducer

    }

    const actions = {
      
      validateUser: props.validateUser,
      logUserIn: props.logUserIn,
      createUser:props.createUser, 
      updateDatabase: props.updateDatabase,
      setUserData: props.setUserData,
      readUserFromDatabase: props.readUserFromDatabase

    }

    return(
        
      <View style = {styles.main}> 
        <View style = {{flex:1.15, justifyContent:'center', alignContent:'center'}}>
          <Image source = {{uri: "https://pngimg.com/uploads/turtle/turtle_PNG65.png", width:400, height:250}}/>
        </View>
        <View style = {{flex:1, justifyContent:'center', alignContent:'center'}}>
          <View style = {{flex:1, justifyContent:'center', alignContent:'center'}}>
            <RegistrationForm reducers = {reducers} reducerActions = {actions} navigation = {props.navigation}/>
          </View>
          <View style = {{flex:3, justifyContent:'center', alignContent:'center'}}>
            <SocialLogin 
             navigation = {props.navigation}
              reducers = {reducers}
              reducerActions = {actions}/>     
          </View>
        </View>
      </View>        

    )
}

const styles = StyleSheet.create({

    main:{

        flex:1, 
        justifyContent: 'space-around',
        alignContent: 'center',

    },
})

const mapStateToProps = (state) => {
  const {userDataReducer, scanDataReducer,authReducer} = state
  return {userDataReducer, scanDataReducer,authReducer}
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({

    validateUser: authActions.validateUser,
    logUserIn: dataActions.logUserIn,
    createUser: dataActions.createUser, 
    updateDatabase: dataActions.updateDatabase,
    setUserData: dataActions.setUserData,
    readUserFromDatabase: dataActions.readUserFromDatabase

  }, dispatch)
);

export default connect(mapStateToProps,mapDispatchToProps)(LogInScreen);
