import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Items extends Component {
  render() {
    return (
      <View style={{margin: 128}}>
        <Text onPress={()=>{Actions.catalogCategory({})}}>This is Items!</Text>
      </View>
    )
  }
}

export default Items;