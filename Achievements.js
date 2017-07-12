import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ScrollView
} from 'react-native';

export default class achievements extends Component {
    static navigationOptions = {
        header: () => <Image style={styles.header} source={require('./Android Mobile 3.png')} />
    }
    render() {
        const { state } = this.props.navigation;
        var textOutput = [];
        for(var i = 1; i < state.params.dataSet.length; i++) {
            if(state.params.dataSet[i][0] == 1) {
                var title = "Achievement: " + state.params.dataSet[i][2] + ": " + state.params.dataSet[i][1] + " Days!";
                textOutput.push(<Text style={styles.text}>{title}</Text>);
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
  }
});