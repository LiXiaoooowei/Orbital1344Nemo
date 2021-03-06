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
    constructor(props) {
      super(props);
      this.dataSet = this.props.screenProps[1];
    }
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
        navigate('Gallery', {data: this.dataSet[i], index: i});
    }
    render() {
        const { state } = this.props.navigation;
        var textOutput = [];
        for(let i = 1; i < this.dataSet.length; i++) {
            if(this.dataSet[i][0] == 1) {
                var title = "Achievement: " + this.dataSet[i][4] + ": " + this.dataSet[i][1] + " Days!";
                textOutput.push(
                    <View style={styles.container}>
                        <View style={styles.container2}>
                            <Text style={styles.text}>{title}</Text>
                            <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'rgba(0,0,0,0)',}} 
                                        style={styles.button}/>
                            <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'blue'}} 
                                        style={styles.button2} 
                                        onPress={()=>this.handlePress(i)}>View Gallery</Button>
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
    alignSelf: 'stretch',
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
  button2: {
    width: 100,
    fontSize: 15,
    color: 'white'
  }
});