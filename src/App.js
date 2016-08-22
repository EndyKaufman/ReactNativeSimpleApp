import React, { Component } from 'react';
import { DrawerLayoutAndroid, Text, View, TouchableHighlight } from 'react-native';

import {About} from './Modals';

class App extends Component {
  showMenu() {
    this.drawer.openDrawer();
  }

  hideMenu() {
    this.drawer.closeDrawer();
  }

  render() {
    var navigationView = (
      <About app={this}>
        <Text>About</Text>
      </About>
    );
    var layout = (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ margin: 10, fontSize: 15, textAlign: 'right' }}>Hello</Text>
        <Text style={{ margin: 10, fontSize: 15, textAlign: 'right' }}>World!</Text>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this.drawer = drawer } }
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        {layout}
      </DrawerLayoutAndroid>
    )
  }
}

export default App;