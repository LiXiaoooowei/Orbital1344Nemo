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

export default class individualTask extends Component {
    static navigationOptions = {
        header: () => <Image style={styles.header} source={require('./Android Mobile 3.png')} />
    }
    handlePress() {
        
    }
    render() {
        const { state } = this.props.navigation;
        var componentArray = [];
        var taskTitle = "Task: " + state.params.data[2];

        for(var i = 1; i <= Number.parseInt(state.params.data[5]); i++) {
            var day = "Day " + i + ":";
            componentArray.push(<DailyImages title={day} />);
        }
        return(
            <Image style={styles.container} source={require('./Android Mobile 2.png')}>
                <ScrollView contentContainerStyle={styles.scroller}>
                    <Text style={styles.text}>{taskTitle}</Text>
                    <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                            style={styles.button}
                            onPress={()=>this.handlePress()}>Add New Image</Button>
                    {componentArray}
                </ScrollView>
            </Image>
        );
    }
}

class DailyImages extends Component {
    render() {
        return (
            <View style={styles.row}>
                <Text style={styles.text}>{this.props.title}</Text>
                {/*<Image style={styles.container} source={require('./Android Mobile 3.png')} />*/}
            </View>
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
    flex: 1,
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  },
  scroller: {
    justifyContent: 'flex-start',
  },
  row: {
      flex: 1, 
      flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    fontSize: 15,
    color: 'white'
  }
});