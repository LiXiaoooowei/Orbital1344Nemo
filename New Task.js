import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput
} from 'react-native';
import Button from 'react-native-button';
import { NavigationActions } from 'react-navigation';

var RNFS = require('react-native-fs');
var PushNotification = require('react-native-push-notification');

export default class newTask extends Component {
    constructor(props) {
      super(props);
      this.state = { taskText: '',
                     daysText: '',
                     reminderText: ''
                   };
    }
    static navigationOptions = {
        header: () => <Image style={styles.header} source={require('./Android Mobile ΓÇô 3.png')} />
    }
    handlePress() {
      var errorMsg = '';
      var days = Number.parseInt(this.state.daysText, 10);
      var reminder = Number.parseInt(this.state.reminderText, 10);

      var hours = reminder / 100;
      var minutes = reminder % 100;

      if(this.state.taskText == '') errorMsg = errorMsg + 'Error: Please enter a task\n';
      if(days < 100 || isNaN(days)) {
        errorMsg = errorMsg + 'Error: Days must be at least 100\n';
      }    
      if(!(hours >= 0 && hours < 24) || !(minutes >= 0 && minutes < 60)) {
        errorMsg = errorMsg + 'Error: Please enter reminder time in this format: HHMM\n';
      }
      if(errorMsg != '') alert(errorMsg);
      else {
        var date = new Date();

        if(date.getDate() + 1 < date.getDate()) {
          if(date.getMonth() == 11) date.setFullYear(date.getFullYear() + 1, date.getMonth() + 1, date.getDate() + 1);
          else date.setFullYear(date.getFullYear(), date.getMonth() + 1, date.getDate() + 1);
        }
        else date.setDate(date.getDate() + 1);

        PushNotification.localNotificationSchedule({
          id: 0,
          message: "Time to complete your daily challenge!",
          date: date,
          repeatType: 'day'
        });
        
        const { navigate } = this.props.navigation;
        this.props.navigation.dispatch(resetAction);
      }
    }
    render() {
      const { navigate } = this.props.navigation;
        return(
            <Image style={styles.container} source={require('./Android Mobile ΓÇô 2.png')}>
                <View style={styles.row}>
                    <Text style={styles.text}>Task:</Text>
                    <TextInput style={styles.textInput} onChangeText={(taskText) => this.setState({taskText})} />
                    <Text style={styles.text}>Days:</Text>
                    <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={(daysText) => this.setState({daysText})} />                    
                    <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                            style={styles.button}
                            onPress={()=>navigate('Help')}>?</Button>
                </View>
                <View style={styles.row}>
                    <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                            style={styles.button}>Video</Button>
                    <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                            style={styles.button}>Image</Button>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Reminder Alarm:</Text>
                    <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={(reminderText) => this.setState({reminderText}) }/>                   
                    <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                            style={styles.button}
                            onPress={()=>this.handlePress()}>Done</Button>
                </View>
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
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    flexDirection: 'row',  
    backgroundColor: 'rgba(0,0,0,0)',
  },
  button: {
    alignItems: 'center',
    fontSize: 15,
    color: 'white'
  },
  text: {
    flex: 1,
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  },
  textInput: {
    flex: 1
  },
  header: {
    flex: 0.1,
    justifyContent: 'flex-end',
    alignItems: 'center', 
    flexDirection: 'row',  
    backgroundColor: 'rgba(0,0,0,0)',
    height: null,
    width: null,
    resizeMode: 'stretch'
  },
});

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'})
  ]
})