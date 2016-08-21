import React, {Component} from 'react'
import {
    Text,
    View
} from 'react-native'

class Menu extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
            </View>
        )
    }
}

export default Menu