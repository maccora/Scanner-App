import React from 'react';
import {View, Text, Button} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addUser} from '../Components/Redux/UserActions';
import AlanaData from '../AlanaData.json'
 
//Example demonstrating usage of defined function in userActions.

function HolderBScreen(props){

    return(
        <View style = {{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            {console.log("FIRST:",AlanaData.users)}
            <Button title = "add data" onPress={()=>{props.addUser({"name": "Timothy Layne", "email":"Test"})}}/>
            {console.log("FINAL:",AlanaData.users)}
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
