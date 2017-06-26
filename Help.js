import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
} from 'react-native';

export default class achievements extends Component {
    static navigationOptions = {
        header: () => <Image style={styles.header} source={require('./Android Mobile ΓÇô 3.png')} />
    }
    render() {
        var helpMsg = "For Task, input the task you desire to achieve.\nFor Days, input the number of Days you would like to commit to the task. (Must be at least 100)\nFor Reminder, input the time at which you would like to be reminded of the task. (Format: HHMM)"
        return (
            <Image style={styles.container} source={require('./Android Mobile ΓÇô 2.png')}>
                <Text style={styles.text}>{helpMsg}</Text>
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
  }
});