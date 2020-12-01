import React from 'react';
import {View, Text, Button} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addUser} from '../Components/Redux/UserActions';
 function HolderBScreen(props){

    return(
        <View style = {{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Button title = "add data" onPress={()=>{props.addUser({"name": "Timothy Layne", "email":"timothylayne93@gmail.com"})}}/>
            {props.users.userData}
        </View>
    )

}

const mapStateToProps = (state) => {
    const { users } = state
    return { users }
  };
  const mapDispatchToProps = dispatch => (
    bindActionCreators({
      addUser,
    }, dispatch)
  );
  export default connect(mapStateToProps,mapDispatchToProps)(HolderBScreen);
 
