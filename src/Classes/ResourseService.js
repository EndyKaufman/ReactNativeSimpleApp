import React, { Component } from 'react';

import db from './../Database/NativeDatabase';

class ResourseService {

  constructor(name) {
    this.state = { items: [], name: name };
  }

  load() {
    var vm = this;
    db.run(
      db.query.select().table(vm.state.name)
    ).then((data) => {
      let items = [];
      for (let i = 0; i < data.rows.length; i++) {
        let item = data.rows.item(i);
        items.push(item.name);
      }
      vm.setState({ items: items });
    }).catch((err) => {
      console.log(err);
    });
  }

}

export default ResourseService;