import React, { Component } from 'react';
import { Modal, View, Text, TouchableHighlight } from 'react-native';

class MyLayout extends Component {
  render() {
    let {
      app,
      name
    } = this.props;
    console.log(app);
    if (app.drawer && app.drawer.state.activeLayout == name) {
      return this._render();
    } else {
      return null;
    }
  }
}

export default MyLayout;