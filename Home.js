import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  ProgressBarAndroid
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Button from 'react-native-button';
import firebase from 'firebase';


export default class task extends Component {
    constructor(props) {
      super(props);
      const firebaseApp = this.props.screenProps[0];
      this.tasksRef = firebaseApp.database().ref();
    }
    static navigationOptions = {
        header: () => <Image style={styles.header} source={require('./Android Mobile 3.png')} />
    }
    handlePress() {
      this.props.screenProps[1] = [];
      firebase.auth().signOut();
      this.props.navigation.dispatch(resetAction);
    }
    render() {
        const { navigate } = this.props.navigation;
        
        return(
            <Image style={styles.container} source={require('./Android Mobile 2.png')}>
                <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'blue'}} 
                                    style={styles.button} 
                                    onPress={()=>navigate('Task')}>Challenges</Button>
                <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'rgba(0,0,0,0)',}} 
                                    style={styles.button}/>
                <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'blue'}} 
                                    style={styles.button} 
                                    onPress={()=>navigate('Achievements')}>Achievements</Button>
                <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'rgba(0,0,0,0)',}} 
                                    style={styles.button}/>
                <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'blue'}} 
                                    style={styles.button} 
                                    onPress={()=>this.handlePress()}>Log Out</Button>
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
    justifyContent: 'flex-end',
    alignItems: 'center', 
    flexDirection: 'row',  
    backgroundColor: 'rgba(0,0,0,0)',
    height: null,
    width: null,
    resizeMode: 'stretch'
  },
  button: {
    width: 100,
    fontSize: 15,
    color: 'white'
  }
});

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'SignIn'})
  ]
})