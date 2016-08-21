import React, { Component } from 'react'
import { DrawerLayoutAndroid } from 'react-native'

import Page from './Start/Page'
import Menu from './Start/Menu'

const styles = require('./styles.js')

class App extends Component {
  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={()=>(
          <Menu/>
          )}>
        <Page/>
      </DrawerLayoutAndroid>
    )
  }
}

export default App