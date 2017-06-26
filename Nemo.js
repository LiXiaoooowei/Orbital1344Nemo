import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import loading from './Loading Screen.js';
import home from './Home.js';
import task from './Task.js';
import newTask from './New Task.js';
import achievements from './Achievements.js';
import individualTask from './Individual Task.js';
import help from './Help.js';

const nemo = StackNavigator({
    Loading: { screen : loading },
    Home: { screen : home},
    Task: { screen : task },
    NewTask: { screen : newTask },
    Achievements: { screen : achievements},
    IndividualTask: { screen : individualTask},
    Help : { screen : help }
});

AppRegistry.registerComponent('nemo', () => nemo);