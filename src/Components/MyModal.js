import React, { Component } from 'react';
import { Modal, View } from 'react-native';

class MyModal extends Component {

  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  _setModalVisible(visible) {
    this.props.app.hideMenu();
    this.setState({modalVisible: visible});
  }

  show(){
    this._setModalVisible(true)
  }

  hide(){
    this._setModalVisible(false)
  }

  toggle(){
    this._setModalVisible(!this.state.modalVisible)
  }

  render() {
    const content=this.props.contentRender?this.props.contentRender(this.modal):'';
    return (
        <Modal
          ref={(modal)=>{this.modal=modal}} 
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
              this.hide();
        }}>
         <View style={{marginTop: 22}}>
            {content}
         </View>
        </Modal>
    );
  }
}

export default MyModal;