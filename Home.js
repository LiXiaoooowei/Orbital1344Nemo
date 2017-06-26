import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  ProgressBarAndroid
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Button from 'react-native-button';


export default class task extends Component {
    static navigationOptions = {
        header: ({navigation}) => <Image style={styles.header} source={require('./Android Mobile ΓÇô 3.png')} />
    }
    render() {
        const { navigate } = this.props.navigation;

        return(
            <Image style={styles.container} source={require('./Android Mobile ΓÇô 2.png')}>
                <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                                    style={styles.button} 
                                    onPress={()=>navigate('Task')}>Challenges</Button>
                <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                                    style={styles.button} 
                                    onPress={()=>navigate('Achievements')}>Achievements</Button>
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
    fontSize: 15,
    color: 'white'
  }
});