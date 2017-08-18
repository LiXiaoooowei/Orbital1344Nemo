import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';
import Button from 'react-native-button';
import { NavigationActions } from 'react-navigation';

var PushNotification = require('react-native-push-notification');

export default class removeTask extends Component {
    constructor(props) {
      super(props);
      const firebaseApp = this.props.screenProps[0];
      this.tasksRef = firebaseApp.database().ref();
    }
    static back(navigation) {
        const {goBack} = navigation;
        goBack();
    }
    static navigationOptions = {
        header: ({navigation}) => <Image style={styles.header} source={require('./Android Mobile 3.png')}>
                            <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                                  style={styles.button}
                                  onPress={()=>{removeTask.back(navigation)}}>Back</Button>
                      </Image>
    }
    handleRemove(index) {
        var iD = this.props.screenProps[1][index][5];
        PushNotification.cancelLocalNotifications({id: iD.toString()});
        this.props.screenProps[1].splice(index,1);
        this.tasksRef.child('task').child(this.props.screenProps[2]).child(iD).remove();
        this.props.navigation.dispatch(resetAction);
    }
    render() {
        const { state } = this.props.navigation;
        const { goBack } = this.props.navigation;
        var msg = "CONFIRM REMOVE TASK?"
        return (
            <Image style={styles.container} source={require('./Android Mobile 2.png')}>
                <Text style={styles.text}>{msg}</Text>
                <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'red'}} 
                        style={styles.button2}
                        onPress={()=>this.handleRemove(state.params.index)}>
                        YES
                </Button>
                <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'rgba(0,0,0,0)',}} 
                        style={styles.button}/>
                <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'blue'}} 
                        style={styles.button2}
                        onPress={()=>goBack()}>
                        NO
                </Button>
            </Image>
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
    fontSize: 50,
    color: 'red',
    textAlign: 'center'
  },
  button: {
    fontSize: 15,
    color: 'white'
  },
  button2: {
    width: 100,
    fontSize: 15,
    color: 'white'
  }
});

const resetAction = NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'}),
    NavigationActions.navigate({routeName: 'Task'})
  ]
})