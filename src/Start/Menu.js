import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import AboutModal from './../About/Modal';

class StartMenu extends Component {
    render() {
    let {
          drawer
    } = this.props;

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <AboutModal style={{margin: 10, fontSize: 15, textAlign: 'left'}} title="About" drawer={drawer}/>
            </View>
        )
    }
}

export default StartMenu;