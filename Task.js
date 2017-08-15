import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  ProgressBarAndroid,
  View,
  Text
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Button from 'react-native-button';

var PushNotification = require('react-native-push-notification');

export default class task extends Component {
    constructor(props) {
      super(props);
      const firebaseApp = this.props.screenProps[0];
      this.tasksRef = firebaseApp.database().ref();
      this.dataSet = this.props.screenProps[1];
    }
    static newTask(navigation) {
        const {navigate} = navigation;
        navigate('NewTask');
    }
    static back(navigation) {
        const {goBack} = navigation;
        goBack();
    }
    static navigationOptions = {
        header: ({navigation}) => (
            <Image style={styles.header} source={require('./Android Mobile 3.png')}>
                <View style={styles.headerL}>
                    <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                            style={styles.button}
                            onPress={()=>{task.back(navigation)}}>Back</Button>
                </View>
                <View style={styles.headerR}>
                    <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                            style={styles.button}
                            onPress={()=>{task.newTask(navigation)}}>+</Button>
                </View>
            </Image>
        ),
    }
    handlePress(i) {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        navigate('IndividualTask', {data: this.dataSet[i], index: i});
    }
    handleRemove(i) {
        var iD = this.dataSet[i][5];
        PushNotification.cancelLocalNotifications({id: iD.toString()});
        this.props.screenProps[1].splice(i,1);
        this.tasksRef.child('task').child(this.props.screenProps[2]).child(iD).remove();
        this.props.navigation.dispatch(resetAction);
    }
    render() {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        var buttonArray = [];

        for(let i = 1; i < this.dataSet.length; i++) {
          if(this.dataSet[i][0] < 1) {
            var title = "Task: " + this.dataSet[i][4] + " Day " + this.dataSet[i][1];
            buttonArray.push(
                <View style={styles.container}>
                    <View style={styles.container2}>
                        <Text style={styles.text}>{title}</Text>
                        <View style={styles.row}>
                            <Text style={styles.text}>Progress: </Text>
                            <ProgressBarAndroid style={styles.progressBar} styleAttr='Horizontal' indeterminate={false} progress={this.dataSet[i][0]} />
                        </View>
                        <View style={styles.row}>
                            <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'blue'}} 
                                    style={styles.button2}
                                    onPress={()=>this.handlePress(i)}>
                                    View Task
                            </Button>
                            <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'rgba(0,0,0,0)',}} 
                                    style={styles.button}/>
                            <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'blue'}} 
                                    style={styles.button2}
                                    onPress={()=>this.handleRemove(i)}>
                                    Remove Task
                            </Button>
                        </View>
                        <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'rgba(0,0,0,0)',}} 
                                style={styles.button}/>                    
                    </View>
                    <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'rgba(0,0,0,0)',}} 
                            style={styles.button}/>
                </View>
            );
          }
        }
        return(
            <Image style={styles.container} source={require('./Android Mobile 2.png')}>
                <ScrollView contentConatainerStyle={styles.scroller}>
                    {buttonArray}
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
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    alignSelf: 'stretch'
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    flexDirection: 'row',  
    backgroundColor: 'rgba(0,0,0,0)',
  },
  progressBar: {
      width: 100,
      alignSelf: 'center'
  },
  header: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center', 
    flexDirection: 'row',  
    backgroundColor: 'rgba(0,0,0,0)',
    height: null,
    width: null,
    resizeMode: 'stretch'
  },
  headerL: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center', 
    flexDirection: 'row',  
    backgroundColor: 'rgba(0,0,0,0)',
    height: null,
    width: null,
    resizeMode: 'stretch'
  },
  headerR: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center', 
    flexDirection: 'row',  
    backgroundColor: 'rgba(0,0,0,0)',
    height: null,
    width: null,
    resizeMode: 'stretch'
  },
  button: {
    fontSize: 15,
    color: 'white'
  },
  button2: {
    width: 100,
    fontSize: 15,
    color: 'white'
  },
  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  },
  scroller: {
    justifyContent: 'flex-start',
  }
});

const resetAction = NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'}),
    NavigationActions.navigate({routeName: 'Task'})
  ]
})