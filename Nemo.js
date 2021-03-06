import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import App from './src/app.js';
import loading from './Loading Screen.js';
import home from './Home.js';
import task from './Task.js';
import removeTask from './RemoveTask.js';
import newTask from './New Task.js';
import achievements from './Achievements.js';
import individualTask from './Individual Task.js';
import dailyMedia from './DailyMedia.js';
import editCaption from './EditCaption.js';
import help from './Help.js';
import share from './Share.js';
import gallery from './Gallery.js';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

var config = {
  apiKey: "AIzaSyC5OKXlb9wBqYMUQWcBt8JNxrMToNR-8qc",
  authDomain: "nemo-31ad6.firebaseapp.com",
  databaseURL: "https://nemo-31ad6.firebaseio.com",
  projectId: "nemo-31ad6",
  storageBucket: "nemo-31ad6.appspot.com"
};
const firebaseApp = firebase.initializeApp(config);

class nemo extends Component {
  render() {
    return <Navigate screenProps={[firebaseApp, [], '', false]} />;
  }
}

const Navigate = StackNavigator({
    SignIn: { screen : App },
    Loading: { screen : loading },
    Home: { screen : home },
    Task: { screen : task },
    RemoveTask: { screen : removeTask },
    NewTask: { screen : newTask },
    Achievements: { screen : achievements },
    IndividualTask: { screen : individualTask },
    DailyMedia: { screen : dailyMedia },
    EditCaption: { screen : editCaption },
    Help: { screen : help },
    Gallery: { screen : gallery },
    Share: { screen : share }
});

AppRegistry.registerComponent('nemo', () => nemo);