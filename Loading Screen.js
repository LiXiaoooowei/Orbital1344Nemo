import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import firebase from 'firebase';

export default class loading extends Component {
  constructor(props) {
    super(props);
    const firebaseApp = this.props.screenProps[0];
    this.tasksRef = firebaseApp.database().ref();
    this.dataSet = this.props.screenProps[1];
  }
  static navigationOptions = {
    header : (visible = false)
  }
  componentDidMount() {
    this.props.screenProps[2] = firebase.auth().currentUser.uid;
    var user = this.props.screenProps[2];
    this.dataSet = [];
    this.dataSet.push(user);
    if(this.props.screenProps[3] == false) {
      this.tasksRef.child('notifID').orderByChild('user').equalTo(user).once('value', (dataSnapShot) => {
        if(dataSnapShot.exists()){
          dataSnapShot.forEach((child) => {
            if(child.child('id').val() != 0) {
              this.tasksRef.child('task').child(user).orderByChild('id').once('value', (dataSnapShot) => {
                dataSnapShot.forEach((child) => {
                  var data = [];
                  var date = new Date(Date.now());

                  var day = child.child('lastUpdated').child(0).val();
                  var month = child.child('lastUpdated').child(1).val();
                  var year = child.child('lastUpdated').child(2).val();

                  if(child.child('progress').val() != 1.0 && (date.getDate() != day || date.getMonth() != month || date.getFullYear() != year)) {
                      date = new Date(Date.now() - 86400000);

                      if(date.getDate() != day || date.getMonth() != month || date.getFullYear() != year) {
                          this.tasksRef.child('task').child(user).child(child.child('id').val()).child('progress').set(0);
                          data.push(0);
                          this.tasksRef.child('task').child(user).child(child.child('id').val()).child('days').set(1);
                          data.push(1);
                          this.tasksRef.child('task').child(user).child(child.child('id').val()).child('media').set([child.child('media').child(0).val(),child.child('media').child(1).val()]);
                          data.push([child.child('media').child(0).val(),child.child('media').child(1).val()]);
                          this.tasksRef.child('task').child(user).child(child.child('id').val()).child('caption').set([""]);
                          data.push([""]);
                      }
                      else {
                        var numDays = child.child('media').val().length - 1;

                        this.tasksRef.child('task').child(user).child(child.child('id').val()).child('days').set(numDays);
                        data.push(child.child('progress').val());
                        data.push(numDays);
                        data.push(child.child('media').val());

                        var captions = child.child('caption').val();
                        if(captions.length < numDays) captions.push("");
                        this.tasksRef.child('task').child(user).child(child.child('id').val()).child('caption').set(captions);
                        data.push(captions);
                      }
                  }
                  else {
                      data.push(child.child('progress').val());
                      data.push(child.child('days').val());
                      data.push(child.child('media').val());
                      data.push(child.child('caption').val());
                  }
                  
                  var lastUpdated = [];
                  lastUpdated.push(child.child('lastUpdated').child(0).val());
                  lastUpdated.push(child.child('lastUpdated').child(1).val());
                  lastUpdated.push(child.child('lastUpdated').child(2).val());

                  data.push(child.child('title').val());
                  data.push(child.child('id').val());
                  data.push(lastUpdated);
                  data.push(child.child('totalDays').val());

                  this.dataSet.push(data);
                });
                this.props.screenProps[1] = this.dataSet;
                this.props.navigation.dispatch(resetAction);
              });
            }
            else {
              this.props.screenProps[1] = this.dataSet;
              this.props.navigation.dispatch(resetAction);
            }
          });
        }
        else {
          this.tasksRef.child('notifID').child(user).child('id').set(0);
          this.tasksRef.child('notifID').child(user).child('user').set(user);
          this.props.screenProps[1] = this.dataSet;
          this.props.navigation.dispatch(resetAction);
        }
      });
    }
  }
  render() {
    return (
      <Image style={styles.container} source={require('./Android Mobile 1.png')} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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