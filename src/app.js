import React, {Component} from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner  } from './components/common';
import LoginForm from './components/LoginForm';
import { NavigationActions } from 'react-navigation';


export default class App extends Component {
  state = { loggedIn: null};

  static navigationOptions = {
    header : (visible = false)
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false});
      }
    });
  }

  renderContent(){
    switch (this.state.loggedIn){
      case true:
        this.props.navigation.dispatch(resetAction);
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large"/>;

    }
  }

  render() {
    return (
      <View>
        <Header headerText = "Authentication"/>
        {this.renderContent()}
      </View>
    );
  }
}

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Loading'})
  ]
});
