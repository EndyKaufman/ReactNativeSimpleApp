import React, { Component } from 'react';
import { Modal, View, Text, TouchableHighlight } from 'react-native';

class MyModal extends Component {

  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
  }

  _setModalVisible(visible) {
    this.props.app.drawer.hideMenu();
    this.setState({ modalVisible: visible });
  }

  show() {
    this._setModalVisible(true)
  }

  hide() {
    this._setModalVisible(false)
  }

  toggle() {
    this._setModalVisible(!this.state.modalVisible)
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
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.hide();
          } }>
          <View>
            {children}
          </View>
        </Modal>
        <TouchableHighlight onPress={() => { this.show(); } }>
          <Text>{title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default MyModal;