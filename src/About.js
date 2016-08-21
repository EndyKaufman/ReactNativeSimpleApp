import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import {MyModal} from './Components';

class About extends Component {
  render() {
    let {
          icon,
          title,
          app
    } = this.props;

    return (
      <View style={{marginTop: 22}}>
        <MyModal 
          app={app} 
          ref={(modal)=>{this.modal=modal}} 
          contentRender={()=>( 
            <View>         
              <Text>About this app!</Text>
              <TouchableHighlight onPress={() => {
                this.modal.toggle()
              }}>
                <Text>Hide</Text>
              </TouchableHighlight>
            </View>
          )}
        />
        <TouchableHighlight onPress={() => {this.modal.show();}}>
          <Text>{title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default About;