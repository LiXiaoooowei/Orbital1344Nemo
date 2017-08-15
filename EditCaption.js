import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
} from 'react-native';
import Button from 'react-native-button';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class editCaption extends Component {
    constructor(props) {
      super(props);
      const firebaseApp = this.props.screenProps[0];
      this.tasksRef = firebaseApp.database().ref();
      this.state = { 
        captionText: ''
      };
    }
    static back(navigation) {
        const { goBack } = navigation;
        goBack();
    }
    static navigationOptions = {
        header: ({navigation}) => <Image style={styles.header} source={require('./Android Mobile 3.png')}>
                          <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                                  style={styles.button}
                                  onPress={()=>{editCaption.back(navigation)}}>Back</Button>
                      </Image>
    }
    handlePress() {
      const { state } = this.props.navigation;
      const { goBack } = this.props.navigation;

      state.params.data[3][state.params.day - 1] = this.state.captionText;
      this.props.screenProps[1][state.params.index][3] = state.params.data[3];
      this.tasksRef.child('task').child(this.props.screenProps[2]).child(state.params.data[5]).child('caption').set(state.params.data[3]);

      goBack();
    }
    componentWillMount() {
      const { state } = this.props.navigation;
      this.setState({captionText: state.params.data[3][state.params.day - 1]});
    }
    render() {
        return(
            <Image style={styles.container} source={require('./Android Mobile 2.png')}>
                <Text style={styles.text}>Enter New Caption:</Text>
                <TextInput value={this.state.captionText} style={styles.textInput} onChangeText={(text) => this.setState({captionText : text})} />
                <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'rgba(0,0,0,0)',}} 
                                    style={styles.button}/>
                <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'blue'}} 
                        style={styles.button2}
                        onPress={()=>this.handlePress()}>Done</Button>
                <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'rgba(0,0,0,0)',}} 
                                    style={styles.button}/>
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
  button: {
    alignItems: 'center',
    fontSize: 15,
    color: 'white'
  },
  button2: {
    width: 100,
    fontSize: 15,
    color: 'white'
  },
  text: {
    height: 50,
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  },
  textInput: {
    height: 50,
    width: 300
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
});