import React, { Component } from 'react';
import {DrawerLayoutAndroid} from 'react-native';

class MyDrawer extends Component {
  show() {
    this.drawer.openDrawer();
  }

  hide() {
    this.drawer.closeDrawer();
  }

  render() {
    let {
      app,
      children,
      navigation
    } = this.props;
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this.drawer = drawer } }
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigation}>
        {children}
      </DrawerLayoutAndroid>
    )
  }
}

export default MyDrawer;