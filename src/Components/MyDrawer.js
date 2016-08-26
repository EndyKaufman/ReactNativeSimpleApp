import React, { Component } from 'react';
import {DrawerLayoutAndroid} from 'react-native';

class MyDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = { activeLayout: props.activeLayout };
  }

  show() {
    this.drawer.openDrawer();
  }

  hide() {
    this.drawer.closeDrawer();
  }

  render() {
    let {
      app,
      layouts,
      navigation
    } = this.props;
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this.drawer = drawer } }
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigation}>
        {layouts}
      </DrawerLayoutAndroid>
    )
  }
}

export default MyDrawer;