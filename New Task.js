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
import * as firebase from 'firebase';

var RNFS = require('react-native-fs');
var PushNotification = require('react-native-push-notification');

export default class newTask extends Component {
    constructor(props) {
      super(props);
      const firebaseApp = this.props.screenProps[0];
      this.tasksRef = firebaseApp.database().ref();
      this.state = { taskText: '',
                     daysText: '',
                     reminderText: ''
                   };
    }
    static navigationOptions = {
        header: () => <Image style={styles.header} source={require('./Android Mobile 3.png')} />
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
      if(errorMsg != '') {
        this.setState({taskText: ''});
        this.setState({daysText: ''});
        this.setState({reminderText: ''});
        alert(errorMsg);
      }
      else {
        var date = new Date(Date.now() + 86400000);

        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        date.setMilliseconds(0);

        var taskID = 0;
        var user = this.props.screenProps[2];
        this.tasksRef.child('notifID').orderByChild('user').equalTo(user).once('value', (dataSnapShot) => {
          dataSnapShot.forEach((child) => {
            taskID=child.child('id').val();
            var notif = "Time to complete your daily challenge: " + this.state.taskText + "!"
            PushNotification.localNotificationSchedule({
              id: taskID,
              message: notif,
              date: date,
              repeatType: 'day'
            });

            date = new Date(Date.now());
            
            var taskIDString = taskID.toString();
            var taskInput = this.tasksRef.child('task').child(user).child(taskIDString);
            
            taskInput.child('id').set(taskID);
            taskInput.child('title').set(this.state.taskText);
            taskInput.child('days').set(1);
            taskInput.child('totalDays').set(this.state.daysText);
            taskInput.child('lastUpdated').set([0,0,0]);
            taskInput.child('progress').set(0.00);
            
            taskID++;
            this.tasksRef.child('notifID').child(user).child('id').set(taskID);
            alert("Task successfully added!");
            this.props.navigation.dispatch(resetAction);
          }); 
        });
      }
    }
    /*componentDidMount() {
      this.tasksRef.child('idStorage').child('notifID').child('id').set(0);
    }*/
    render() {
      const { navigate } = this.props.navigation;
        return(
            <Image style={styles.container} source={require('./Android Mobile 2.png')}>
                <View style={styles.row}>
                    <Text style={styles.text}>Task:</Text>
                    <TextInput value={this.state.taskText} style={styles.textInput} onChangeText={(text) => this.setState({taskText : text})} />
                    <Text style={styles.text}>Days:</Text>
                    <TextInput value={this.state.daysText} style={styles.textInput} keyboardType='numeric' onChangeText={(text) => this.setState({daysText: text})} />                    
                    <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                            style={styles.button}
                            onPress={()=>navigate('Help')}>?</Button>
                </View>
                {/*<View style={styles.row}>
                    <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                            style={styles.button}>Video</Button>
                    <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                            style={styles.button}>Image</Button>
                </View>*/}
                <View style={styles.row}>
                    <Text style={styles.text}>Reminder Alarm:</Text>
                    <TextInput value={this.state.reminderText} style={styles.textInput} keyboardType='numeric' onChangeText={(text) => this.setState({reminderText: text}) }/>                   
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
    NavigationActions.navigate({ routeName: 'Loading'})
  ]
});