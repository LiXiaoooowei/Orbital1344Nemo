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
import ImagePicker from 'react-native-image-picker';
import * as firebase from 'firebase';
import fs from 'react-native-fs';
import Video from 'react-native-video';
import RNFetchBlob from 'react-native-fetch-blob'

var PushNotification = require('react-native-push-notification');

export default class individualTask extends Component {
    static back(navigation) {
        const {goBack} = navigation;
        goBack();
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
        const firebaseApp = this.props.screenProps[0];
        this.tasksRef = firebaseApp.database().ref();
        this.state = {
            images: [],
            isPaused: false
        }
    }
    handlePress() {
        var options;
        const { state } = this.props.navigation;
        if(state.params.data[2][0] == true) {
            options = {
                title: 'Select Video',
                storageOptions: {
                    cameraRoll: true
                },
                noData: false,
                mediaType: 'video'
            };
        }
        else {
            options = {
                title: 'Select Image',
                storageOptions: {
                    cameraRoll: true
                },
                noData: false,
                mediaType: 'photo'
            };
        }
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            }
            else if (response.error) {
                alert('ImagePicker Error: ', response.error);
            }
            else {
                let source = { uri: response.uri };
                const { navigate } = this.props.navigation;
                const media = source.uri;

                const Blob = RNFetchBlob.polyfill.Blob;
                const fs = RNFetchBlob.fs;
                window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
                window.Blob = Blob;

            
                let uploadBlob = null;
                var mediaString;
                let mime;
                if(state.params.data[2][0] == true) {
                    var titleString = 'Day ' + state.params.data[1] + '.mp4';
                    mime = 'video/mp4';
                    mediaString = titleString;
                }
                else {
                    var titleString = 'Day ' + state.params.data[1] + '.jpg'
                    mime = 'image/jpg';
                    mediaString = titleString;
                }
                const imageRef = firebase.storage().ref(this.props.screenProps[2]).child(state.params.data[4].toString()).child('Daily Upload').child(mediaString);
                fs.readFile(media, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    // URL of the image uploaded on Firebase storage
                    state.params.data[2][state.params.data[1]+1] = url;
                    this.props.screenProps[1][state.params.data[4]+1][2] = state.params.data[2];
                    this.tasksRef.child('task').child(this.props.screenProps[2]).child(state.params.data[4]).child('media').set(state.params.data[2]);
                    this.setState({images: state.params.data[2]});
                    var date = new Date(Date.now());
                    state.params.data[5] = [date.getDate(), date.getMonth(), date.getFullYear()];
                    state.params.data[0] = state.params.data[1] / Number.parseFloat(state.params.data[6]);
                    this.props.screenProps[1][state.params.data[4]+1][5] = state.params.data[5];
                    this.props.screenProps[1][state.params.data[4]+1][0] = state.params.data[0];
                    this.tasksRef.child('task').child(this.props.screenProps[2]).child(state.params.data[4]).child('lastUpdated').set(state.params.data[5]);
                    this.tasksRef.child('task').child(this.props.screenProps[2]).child(state.params.data[4]).child('progress').set(state.params.data[0]);

                    if(state.params.data[0] == 1.0) {
                        PushNotification.cancelLocalNotifications({id: state.params.data[4]});
                        navigate('Gallery', {media: state.params.data[2]})
                    }
                    alert("Media successfully uploaded!");
                })
                .catch((error) => {
                    alert(error);
                });
                
                

            }
        });
    }
    componentDidMount() {
        const { state } = this.props.navigation;
        this.setState({images: state.params.data[2]});
    }
    render() {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        var componentArray = [];
        var taskTitle = "Task: " + state.params.data[3];

        for(var i = 1; i <= Number.parseInt(state.params.data[6]); i++) {
            var day = "Day " + i + ":";
            componentArray.push(<DailyImages isVid={state.params.data[2][0]} title={day} source={this.state.images[i+1]}/>);
        }
        if(state.params.data[2][0] == true) {
            return(
                <Image style={styles.container} source={require('./Android Mobile 2.png')}>
                    <ScrollView contentContainerStyle={styles.scroller}>
                        <Text style={styles.text}>{taskTitle}</Text>
                        <Video style={styles.containerImg}  rate={1.0}                   // 0 is paused, 1 is normal.
                                                            volume={1.0}                 // 0 is muted, 1 is normal.
                                                            muted={false}                // Mutes the audio entirely.
                                                            paused={this.state.isPaused} // Pauses playback entirely.
                                                            resizeMode="cover"           // Fill the whole screen at aspect ratio.
                                                            repeat={true} source={{uri: state.params.data[2][1]}} />
                        <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                                style={styles.button}
                                onPress={()=>this.setState({isPaused: false})}>Play</Button>
                        <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                                style={styles.button}
                                onPress={()=>this.setState({isPaused: true})}>Pause</Button>
                        <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                                style={styles.button}
                                onPress={()=>this.handlePress()}>Add/Change Video</Button>
                        {componentArray}
                    </ScrollView>
                </Image>
            );
        }
        else {
            return(
                <Image style={styles.container} source={require('./Android Mobile 2.png')}>
                    <ScrollView contentContainerStyle={styles.scroller}>
                        <Text style={styles.text}>{taskTitle}</Text>
                        <Image style={styles.containerImg} source={{uri: state.params.data[2][1]}} />
                        <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                                style={styles.button}
                                onPress={()=>this.handlePress()}>Add/Change Image</Button>
                        {componentArray}
                    </ScrollView>
                </Image>
            );
        }
        
    }
}

class DailyImages extends Component {
     constructor(props) {
        super(props);
        this.state = {
            isPaused: false
        }
    }
    render() {
        if(this.props.isVid == true) {
            return (
                <View style={styles.row}>
                    <Text style={styles.text}>{this.props.title}</Text>
                    <Video style={styles.containerImg}  rate={1.0}                   // 0 is paused, 1 is normal.
                                                        volume={1.0}                 // 0 is muted, 1 is normal.
                                                        muted={false}                // Mutes the audio entirely.
                                                        paused={this.state.isPaused} // Pauses playback entirely.
                                                        resizeMode="cover"           // Fill the whole screen at aspect ratio.
                                                        repeat={true} source={{uri: this.props.source}} />
                    <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                                style={styles.button}
                                onPress={()=>this.setState({isPaused: false})}>Play</Button>
                    <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                                style={styles.button}
                                onPress={()=>this.setState({isPaused: true})}>Pause</Button>
                </View>
            );
        }
        else{
            return (
                <View style={styles.row}>
                    <Text style={styles.text}>{this.props.title}</Text>
                    <Image style={styles.containerImg} source={{uri: this.props.source}} />
                </View>
            );
        }
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
    flex: 1,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    paddingBottom: 5
  },
  scroller: {
    justifyContent: 'flex-start',
  },
  row: {
      flex: 1, 
      flexDirection: 'column',
      justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
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
});