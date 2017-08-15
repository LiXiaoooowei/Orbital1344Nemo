import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';
import Button from 'react-native-button';
import { NavigationActions } from 'react-navigation';

export default class help extends Component {
    static back(navigation) {
        const {goBack} = navigation;
        goBack();
    }
    static navigationOptions = {
        header: ({navigation}) => <Image style={styles.header} source={require('./Android Mobile 3.png')}>
                            <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                                  style={styles.button}
                                  onPress={()=>{help.back(navigation)}}>Back</Button>
                      </Image>
    }
    render() {
        var helpMsg = "For Task, input the task you desire to achieve.\nFor Days, input the number of Days you would like to commit to the task. (Must be at least 30)\nFor Reminder, input the time at which you would like to be reminded of the task. (Format: HHMM)"
        return (
            <Image style={styles.container} source={require('./Android Mobile 2.png')}>
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
    justifyContent: 'flex-start',
    alignItems: 'center', 
    flexDirection: 'row',  
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
  button: {
    fontSize: 15,
    color: 'white'
  },
});