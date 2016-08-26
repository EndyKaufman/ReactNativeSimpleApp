import React, { Component } from 'react';
import {Text, View, Navigator, TouchableHighlight } from 'react-native';

import {MyLayout} from './../Components';

class Items extends MyLayout {
  _render() {
    const routes = [
      { title: 'Category', index: 0 },
      { title: 'Items', index: 1 }
    ];
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) =>
          <TouchableHighlight onPress={() => {
            if (route.index === 0) {
              navigator.push(routes[1]);
            } else {
              navigator.pop();
            }
          } }>
            <Text>Hello {route.title}!</Text>
          </TouchableHighlight>
        }
        style={{ flex: 1, paddingTop:100 }}
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.HorizontalSwipeJump}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
              { return (<Text>Cancel</Text>); },
              RightButton: (route, navigator, index, navState) =>
              { return (<Text>Done</Text>); },
              Title: (route, navigator, index, navState) =>
              { return (<Text>Awesome Nav Bar</Text>); },
            }}
            style={{ backgroundColor: 'gray' }}
            />
        }
        />
    );
  }
}

export default Items;