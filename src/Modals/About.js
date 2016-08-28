import React, { Component } from 'react';
import {Text, View, TouchableHighlight } from 'react-native';

import {MyModal} from './../Components';

class About extends Component {
  render() {
    let {
      app,
      title
    } = this.props;
    return (
      <MyModal app={app} title={title} ref={(modal) => { this.modal = modal } }>
        <Text>About this app!</Text>
        <TouchableHighlight onPress={() => { this.modal.toggle() } }>
          <Text>Hide</Text>
        </TouchableHighlight>
      </MyModal>
    );
  }
}

export default About;