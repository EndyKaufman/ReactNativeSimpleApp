import React, { Component } from 'react';
import { DrawerLayoutAndroid } from 'react-native';

import AppContent from './App/Content';
import AppMenu from './App/Menu';

class App extends Component {
  render() {
    return (
      <DrawerLayoutAndroid
        ref={'DRAWER'}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={()=>(
          <AppMenu drawer={this.refs['DRAWER']}/>
          )}>
        <AppContent drawer={this.refs['DRAWER']}/>
      </DrawerLayoutAndroid>
    )
  }
}

export default App;