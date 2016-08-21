import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import AboutModal from './About/Modal';

class About extends Component {
  render() {
    let {
          icon,
          title,
          drawer
    } = this.props;

    return (
      <View style={{marginTop: 22}}>
        <AboutModal icon={icon} title={title} drawer={drawer} ref={'MODAL'}/>
        <TouchableHighlight onPress={() => {this.refs['MODAL'].show();}}>
          <Text>{title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default About;