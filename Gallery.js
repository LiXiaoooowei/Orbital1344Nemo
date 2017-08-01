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
        for(var i = 2; i < state.params.media.length; i++) {
            mediaURI.push({
                uri: state.params.media[i],
                isVid: state.params.media[0]
            });
        }
        return (
        <Image style={styles.container} source={require('./Android Mobile 2.png')}>
            <Swiper
                navigation={this.props.navigation}
                media={mediaURI}
                url={state.params.media}
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
  }
});