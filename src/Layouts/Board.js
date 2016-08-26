import React, { Component } from 'react';
import {Text, View, Navigator, TouchableHighlight } from 'react-native';

import {MyLayout} from './../Components';

class Board extends MyLayout {
  _render() {
    let {
      app
    } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ margin: 10, fontSize: 15, textAlign: 'right' }}>Hello</Text>
        <Text style={{ margin: 10, fontSize: 15, textAlign: 'right' }}>World!</Text>
      </View>
    );
  }
}

export default Board;