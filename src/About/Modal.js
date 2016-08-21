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

  render() {
    let {
          icon,
          title
    } = this.props;

    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.");this.setModalVisible(false);}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>About this app!</Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true);
        }}>
          <Text>{title}</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

export default AboutModal;