import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

class AboutModal extends Component {

  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  setModalVisible(visible) {
    this.props.drawer.closeDrawer();
    this.setState({modalVisible: visible});
  }

  show(){
    this.setModalVisible(true)
  }

  hide(){
    this.setModalVisible(false)
  }

  toggle(){
    this.setModalVisible(!this.state.modalVisible)
  }

  render() {
    let {
          icon,
          title
    } = this.props;

    return (
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.");this.hide();}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>About this app!</Text>

            <TouchableHighlight onPress={() => {
              this.toggle()
            }}>
              <Text>Hide</Text>
            </TouchableHighlight>
          </View>
         </View>
        </Modal>
    );
  }
}

export default AboutModal;