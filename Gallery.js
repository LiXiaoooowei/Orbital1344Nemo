import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image
} from 'react-native';
import Button from 'react-native-button';
import Swiper from './Swiper.js';
import { NavigationActions } from 'react-navigation';

export default class gallery extends Component {
    static navigationOptions = {
        header : (visible = false)
    }
    render() {
        const { state } = this.props.navigation;
        var mediaURI = [];
        for(var i = 2; i < state.params.data[2].length; i++) {
            mediaURI.push({
                uri: state.params.data[2][i]
            });
        }
        return (
        <Image style={styles.container} source={require('./Android Mobile 2.png')}>
            <Swiper
                navigation={this.props.navigation}
                media={mediaURI}
                url={state.params.data[2]}
                caption={state.params.data[3]}
                data={state.params.data}
                index={state.params.index}
                user={this.props.screenProps[2]}
                firebase={this.props.screenProps[0]}
            />
        </Image>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    height: null,
    width: null,
    resizeMode: 'stretch'
  },
  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  }
});