import React, { Component } from 'react';
import { DrawerLayoutAndroid } from 'react-native';

import StartPage from './Start/Page';
import StartMenu from './Start/Menu';

class App extends Component {
  render() {
    return (
      <DrawerLayoutAndroid
        ref={'DRAWER'}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={()=>(
          <StartMenu drawer={this.refs['DRAWER']}/>
          )}>
        <StartPage drawer={this.refs['DRAWER']}/>
      </DrawerLayoutAndroid>
    )
  }
}

export default App;