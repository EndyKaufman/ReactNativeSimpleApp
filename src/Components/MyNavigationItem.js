import React, { Component } from 'react';
import {Text, View, TouchableHighlight } from 'react-native';

class MyNavigationItem extends Component {
    render() {
        let {
            app,
            onPress,
            title
        } = this.props;
        if (app !== undefined)
            return (
                <TouchableHighlight onPress={() => {
                    app.drawer.hide(); onPress()
                } }>
                    <Text>{title}</Text>
                </TouchableHighlight>
            );
            else
            return (
                <TouchableHighlight onPress={() => {
                    onPress()
                } }>
                    <Text>{title}</Text>
                </TouchableHighlight>
            );
    }
}

export default MyNavigationItem;