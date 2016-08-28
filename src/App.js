import React, { Component } from 'react';
import {View} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';

import {MyDrawer, MyNavigationItem} from './Components';

import {About} from './Modals';

import {Category, Items} from './Layouts/Catalog';
import {Index} from './Layouts/Index';

class App extends Component {
  render() {
    console.log(Actions);
    var navigation = (
      <View>
        <About app={this} title="About"/>
        <MyNavigationItem app={this} title="Catalog" onPress={() => { Actions.catalog({ type: 'reset' }) } }/>
        <MyNavigationItem app={this} title="Index" onPress={() => { Actions.index({ type: 'reset' }) } }/>
        <MyNavigationItem app={this} title="Category" onPress={() => {
          Actions.catalog({ type: 'reset' });
          Actions.catalogCategory({});
        } }/>
        <MyNavigationItem app={this} title="Items" onPress={() => {
          Actions.catalog({ type: 'reset' });
          Actions.catalogItems({});
        } }/>
      </View>
    );
    return (
      <MyDrawer
        ref={(drawer) => { this.drawer = drawer } }
        navigation={navigation}>
        <Router>
          <Scene key="root">
            <Scene key="index" component={Index} title="Index" initial={true} />
            <Scene key="catalog">
              <Scene key="catalogCategory" component={Category} title="Category" initial={true}/>
              <Scene key="catalogItems" component={Items} title="Items" />
            </Scene>
          </Scene>
        </Router>
      </MyDrawer>
    )
  }
}

export default App;