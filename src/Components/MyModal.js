import React, { Component } from 'react';
import { Modal, View, Text, TouchableHighlight } from 'react-native';

import MyNavigationItem from './MyNavigationItem';

class MyModal extends Component {

  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  _setIsVisible(visible) {
    this.setState({ isVisible: visible });
  }

  show() {
    this._setIsVisible(true)
  }

  hide() {
    this._setIsVisible(false)
  }

  toggle() {
    this._setIsVisible(!this.state.isVisible)
  }

  render() {
    let {
      app,
      title,
      children
    } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            this.hide();
          } }>
          <View>
            {children}
          </View>
        </Modal>
        <MyNavigationItem app={app} onPress={() => { this.show(); } } title={title}>
        </MyNavigationItem>
      </View>
    );
  }
}

export default MyModal;