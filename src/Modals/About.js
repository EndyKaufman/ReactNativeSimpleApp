import React, { Component } from 'react';
import {Text, View, TouchableHighlight } from 'react-native';
import {MyModal} from './../Controls';

class About extends Component {
  render() {
    let {
      app,
      children
    } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <MyModal ref={(modal) => { this.modal = modal } } app={app}>
          <Text>About this app!</Text>
          <TouchableHighlight onPress={() => { this.modal.toggle() } }>
            <Text>Hide</Text>
          </TouchableHighlight>
        </MyModal>
        <TouchableHighlight onPress={() => { this.modal.show(); } }>
          {children}
        </TouchableHighlight>
      </View>
    );
  }
}

export default About;