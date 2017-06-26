import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ScrollView
} from 'react-native';

var RNFS = require('react-native-fs');

export default class achievements extends Component {
    static navigationOptions = {
        header: () => <Image style={styles.header} source={require('./Android Mobile ΓÇô 3.png')} />
    }
    render() {
        var textOutput = [];
        for(var i = 1; i <= 100; i++) {
            var title = "Achievement " + i + ": " + "100 Days!";
            textOutput.push(<Text style={styles.text}>{title}</Text>);
        }

        return(
            <Image style={styles.container} source={require('./Android Mobile ΓÇô 2.png')}>
                <ScrollView contentContainerStyle={styles.scroller}>
                    <Text style={styles.text}>Achievements</Text>
                    {textOutput}
                </ScrollView>
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
  header: {
    flex: 0.1, 
    backgroundColor: 'rgba(0,0,0,0)',
    height: null,
    width: null,
    resizeMode: 'stretch'
  },
  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  },
  scroller: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});