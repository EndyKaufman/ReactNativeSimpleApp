import React, { Component } from 'react';
import {View} from 'react-native';

import {MyDrawer} from './Components';

import {About} from './Modals';
import {Items, Board} from './Layouts';

class App extends Component {
  render() {
    var navigation = (
      <About app={this}/>
    );

    var layouts = (
      <View>
        <Items app={this} name="items"/>
        <Board app={this} name="board"/>
      </View>
    );

    return (
      <MyDrawer
        ref={(drawer) => { this.drawer = drawer } }
        navigation={navigation}
        activeLayout="board"
        layouts={layouts}/>
    )
  }
}

export default App;