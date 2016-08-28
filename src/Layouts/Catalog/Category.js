import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Category extends Component {
  render() {
    return (
      <View style={{margin: 128}}>
        <Text onPress={()=>{Actions.catalogItems({})}}>This is Category!</Text>
      </View>
    )
  }
}

export default Category;