import React, { Component } from 'react';

import {MyDrawer} from './Controls';

import {About} from './Modals';
import {Start} from './Layouts';

class App extends Component {
  render() {
    var navigation = (
      <About app={this}/>
    );
    return (
      <MyDrawer
        ref={(drawer) => { this.drawer = drawer } }
        navigation={navigation}>
        <Start/>
      </MyDrawer>
    )
  }
}

export default App;