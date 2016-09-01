import React, { Component } from 'react';
import {View} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';

import {MyDrawer, MyNavigationItem} from './Components';

import Database from './Modules/Database';

import {About} from './Modals';

import {Category, Items} from './Layouts/Catalog';
import {Index} from './Layouts/Index';

import db from './Database/NativeDatabase';

class App extends Component {
  render() {

    db.debug = true;
    db.run(
      /*db.schema.createTable('users', function (table) {
        table.increments();
        table.string('name');
        table.timestamps();
      })*/
      //db.schema.renameTable('users', 'old_users')
      //db.query('old_users').insert({name: 'Slaughterhouse Five'})
      db.query.select().table('migrations')
    ).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });

    console.log(Actions);
    var navigation = (
      <View>
        <About app={this} title="About"/>
        <MyNavigationItem app={this} title="Catalog" onPress={() => { Actions.catalog({ type: 'reset' }) } }/>
        <MyNavigationItem app={this} title="Index" onPress={() => { Actions.index({ type: 'reset' }) } }/>
        <MyNavigationItem app={this} title="Database" onPress={() => { Actions.database({ type: 'reset' }) } }/>
      </View>
    );
    return (
      <MyDrawer
        ref={(drawer) => { this.drawer = drawer } }
        navigation={navigation}>
        <Router>
          <Scene key="root">
            <Scene key="index" component={Index} title="Index13" initial={true} />
            <Scene key="catalog">
              <Scene key="catalogCategory" component={Category} title="Category" initial={true}/>
              <Scene key="catalogItems" component={Items} title="Items" />
            </Scene>
            <Scene key="database" component={Database} title="Database"  hideNavBar hideTabBar/>
          </Scene>
        </Router>
      </MyDrawer>
    )
  }
}

export default App;