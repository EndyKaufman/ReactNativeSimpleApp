import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import db from './../../Database/NativeDatabase';

class Items extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    this.props._isMounted = true;
    this.loadItems();
  }

  componentWillUnmount() {
    this.props._isMounted = false;
  }

  renderItem(name) {
    return (
      <View>
        <Text>{name}</Text>
      </View>
    )
  }

  loadItems() {
    var vm = this;
    // if (this.props._isMounted == true) {
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
      let items = [];
      for (let i = 0; i < data.rows.length; i++) {
        let item = data.rows.item(i);
        items.push(item.name);
      }
      vm.setState({ items: items });
      console.log(vmthis.state.items);
    }).catch((err) => {
      console.log(err);
    });
    // }
  }

  render() {
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <View>
        <View style={{ margin: 128 }}>
          <Text onPress={() => { Actions.catalogCategory({}) } }>This is Items!</Text>
        </View>
        <ListView
          dataSource={ds.cloneWithRows(this.state.items) }
          renderRow={this.renderItem}
          enableEmptySections={true}/>
      </View>);
  };
}

export default Items;