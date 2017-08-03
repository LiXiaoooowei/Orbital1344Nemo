import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View
} from 'react-native';
import Button from 'react-native-button';
import { NavigationActions } from 'react-navigation';

export default class achievements extends Component {
    static back(navigation) {
        const {goBack} = navigation;
        goBack();
    }
    static navigationOptions = {
        header: ({navigation}) => <Image style={styles.header} source={require('./Android Mobile 3.png')}>
                                    <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                                        style={styles.button}
                                        onPress={()=>{achievements.back(navigation)}}>Back</Button>
                                  </Image>
    }
    handlePress(i) {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        navigate('Gallery', {media: state.params.dataSet[i]});
    }
    render() {
        const { state } = this.props.navigation;
        var textOutput = [];
        for(let i = 1; i < state.params.dataSet.length; i++) {
            if(state.params.dataSet[i][0] == 1) {
                var title = "Achievement: " + state.params.dataSet[i][3] + ": " + state.params.dataSet[i][1] + " Days!";
                textOutput.push(<Text onPress={()=>this.handlePress(i)} style={styles.text}>{title}</Text>);
            }
        }

        return(
            <Image style={styles.container} source={require('./Android Mobile 2.png')}>
                <ScrollView contentContainerStyle={styles.scroller}>
                    {textOutput}
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
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  },
  scroller: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    fontSize: 15,
    color: 'white'
  },
});