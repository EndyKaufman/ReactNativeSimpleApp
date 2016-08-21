import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import About from './../About';

class AppMenu extends Component {
    render() {
    let {
          app
    } = this.props;

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <About style={{margin: 10, fontSize: 15, textAlign: 'left'}} title="About" app={app}/>
            </View>
        )
    }
}

export default AppMenu;