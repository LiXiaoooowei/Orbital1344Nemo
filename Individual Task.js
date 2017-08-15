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
import Video from 'react-native-video';

export default class individualTask extends Component {
    static back(navigation) {
        navigation.dispatch(resetAction);
    }
    static navigationOptions = {
        header: ({navigation}) => <Image style={styles.header} source={require('./Android Mobile 3.png')}>
                                        <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                                            style={styles.button}
                                            onPress={()=>{individualTask.back(navigation)}}>Back</Button>
                                  </Image>
    }
    constructor(props) {
        super(props);
        this.state = {
            isPaused: false
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        var componentArray = [];
        var taskTitle = "Task: " + state.params.data[4];

        for(let i = 1; i <= state.params.data[1]; i++) {
            var day = "Day " + i;
            componentArray.push(<DailyImages title={day} day={i} navigation={this.props.navigation} data={state.params.data} index={state.params.index} />);
        }
        if(state.params.data[2][0] == true) {
            return(
                <Image style={styles.container} source={require('./Android Mobile 2.png')}>
                    <Text style={styles.text}>{taskTitle}</Text>
                    <Video style={styles.containerImg}  rate={1.0}                   // 0 is paused, 1 is normal.
                                                        volume={1.0}                 // 0 is muted, 1 is normal.
                                                        muted={false}                // Mutes the audio entirely.
                                                        paused={this.state.isPaused} // Pauses playback entirely.
                                                        resizeMode="cover"           // Fill the whole screen at aspect ratio.
                                                        repeat={true} source={{uri: state.params.data[2][1]}} />
                    <View style={styles.row}>
                        <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'blue'}} 
                                style={styles.button2}
                                onPress={()=>this.setState({isPaused: false})}>
                                Play
                        </Button>
                        <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'rgba(0,0,0,0)',}} 
                                style={styles.button}/>
                        <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'blue'}} 
                                style={styles.button2}
                                onPress={()=>this.setState({isPaused: true})}>
                                Pause
                        </Button>
                    </View>
                    <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'rgba(0,0,0,0)',}} 
                            style={styles.button}/>
                    <ScrollView contentContainerStyle={styles.scroller}>
                        {componentArray}
                    </ScrollView>
                </Image>
            );
        }
        else {
            return(
                <Image style={styles.container} source={require('./Android Mobile 2.png')}>
                    <Text style={styles.text}>{taskTitle}</Text>
                    <Image style={styles.containerImg} source={{uri: state.params.data[2][1]}} />
                    <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'rgba(0,0,0,0)',}} 
                            style={styles.button}/>
                    <ScrollView contentContainerStyle={styles.scroller}>
                        {componentArray}
                    </ScrollView>
                </Image>
            );
        }
        
    }
}

class DailyImages extends Component {
    handlePress(d) {
        const { navigate } = this.props.navigation;
        navigate('DailyMedia', {day: d, data: this.props.data, index: this.props.index});
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container2}>
                    <Text style={styles.text}>{this.props.title}</Text>
                    <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'rgba(0,0,0,0)',}} 
                                style={styles.button}/>
                    <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'blue'}} 
                                style={styles.button2} 
                                onPress={()=>this.handlePress(this.props.day)}>View Media</Button>
                    <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'rgba(0,0,0,0)',}} 
                                style={styles.button}/>
                </View>
                <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'rgba(0,0,0,0)',}} 
                                style={styles.button}/>
            </View>
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
    flex: 0.3,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    paddingBottom: 5
  },
  scroller: {
    justifyContent: 'flex-start',
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
  containerImg: {
    resizeMode: 'stretch',
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 10
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    flexDirection: 'row',  
    backgroundColor: 'rgba(0,0,0,0)',
  }
});

const resetAction = NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'}),
    NavigationActions.navigate({routeName: 'Task'})
  ]
})