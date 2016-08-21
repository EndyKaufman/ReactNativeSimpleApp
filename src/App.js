import React, { Component } from 'react';
import { DrawerLayoutAndroid } from 'react-native';

import AppContent from './App/Content';
import AppMenu from './App/Menu';

class App extends Component {
  showMenu(){
    this.drawer.openDrawer();
  }  

  hideMenu(){
    this.drawer.closeDrawer();
  }  
  
  render() {  
    return (
      <DrawerLayoutAndroid
        ref={(drawer)=>{this.drawer=drawer}} 
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={()=>(
          <AppMenu app={this}/>
          )}>
        <AppContent app={this}/>
      </DrawerLayoutAndroid>
    )
  }
}

export default App;