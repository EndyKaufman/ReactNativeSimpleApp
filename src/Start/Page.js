import React, {Component} from 'react'
import {
    Text,
    View
} from 'react-native'

class Page extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ margin: 10, fontSize: 15, textAlign: 'right' }}>Hello</Text>
                <Text style={{ margin: 10, fontSize: 15, textAlign: 'right' }}>World!</Text>
            </View>
        )
    }
}

export default Page