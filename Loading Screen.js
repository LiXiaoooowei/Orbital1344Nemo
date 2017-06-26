import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class loading extends Component {
  static navigationOptions = {
    header : (visible = false)
  }
  render() {
    const { navigate } = this.props.navigation;
    setTimeout(()=>{this.props.navigation.dispatch(resetAction)}, 500);
    return (
      <Image style={styles.container} source={require('./Android Mobile ΓÇô 1.png')} />
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