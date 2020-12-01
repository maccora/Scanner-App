import React from 'react';
import {View, StyleSheet} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addUser, isUser} from '../Components/Redux/AlanaDataActions';

import SocialLogin from '../Components/SocialLogins.js';
import RegistrationForm from '../Components/RegistrationForm.js';

 function LogInScreen(props){

    return(

        <View style = {styles.main}> 
            
                <RegistrationForm/>
                <SocialLogin 
                navigation = {props.navigation} 
                reducer = {props.AlanaDataReducer}
                reducerAction = {props.addUser}
                />
           

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
const mapStateToProps = (state) => {
    const { AlanaDataReducer } = state
    return { AlanaDataReducer }
  };
  const mapDispatchToProps = dispatch => (
    bindActionCreators({
      addUser,
    }, dispatch)
  );
  export default connect(mapStateToProps,mapDispatchToProps)(LogInScreen);
