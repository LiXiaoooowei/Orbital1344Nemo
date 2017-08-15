import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  ProgressBarAndroid
} from 'react-native';
import Button from 'react-native-button';
import { NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import * as firebase from 'firebase';
import Video from 'react-native-video';
import RNFetchBlob from 'react-native-fetch-blob'

var PushNotification = require('react-native-push-notification');

export default class dailyMedia extends Component {
    static back(navigation) {
        const {goBack} = navigation;
        goBack();
    }
    static navigationOptions = {
        header: ({navigation}) => <Image style={styles.header} source={require('./Android Mobile 3.png')}>
                            <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                                  style={styles.button}
                                  onPress={()=>{dailyMedia.back(navigation)}}>Back</Button>
                      </Image>
    }
    constructor(props) {
        super(props);
        const firebaseApp = this.props.screenProps[0];
        this.tasksRef = firebaseApp.database().ref();
        this.state = {
            images: '',
            caption: '',
            hasMedia: '',
            isPaused: false,
            isLoading: false
        }
    }
    handleMedia() {
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
                this.setState({isLoading: true});
                
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
                const imageRef = firebase.storage().ref(this.props.screenProps[2]).child(state.params.data[5].toString()).child('Daily Upload').child(mediaString);
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
                    this.props.screenProps[1][state.params.index][2] = state.params.data[2];
                    this.tasksRef.child('task').child(this.props.screenProps[2]).child(state.params.data[5]).child('media').set(state.params.data[2]);
                    this.setState({images: state.params.data[2]});
                    var date = new Date(Date.now());
                    state.params.data[6] = [date.getDate(), date.getMonth(), date.getFullYear()];
                    state.params.data[0] = state.params.data[1] / Number.parseFloat(state.params.data[7]);
                    this.props.screenProps[1][state.params.index][6] = state.params.data[6];
                    this.props.screenProps[1][state.params.index][0] = state.params.data[0];
                    this.tasksRef.child('task').child(this.props.screenProps[2]).child(state.params.data[5]).child('lastUpdated').set(state.params.data[6]);
                    this.tasksRef.child('task').child(this.props.screenProps[2]).child(state.params.data[5]).child('progress').set(state.params.data[0]);

                    if(state.params.data[0] == 1.0) {
                        PushNotification.cancelLocalNotifications({id: state.params.data[5].toString()});
                        alert("Acheivement Attained!");
                        navigate('Gallery', {data: state.params.data, index: state.params.index})
                    }
                    this.setState({images: url});
                    this.setState({hasMedia: 'Edit Media'});
                    this.setState({isLoading: false});
                    alert("Media successfully uploaded!");
                })
                .catch((error) => {
                    alert(error);
                });
            }
        });
    }
    handleCaption() {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        this.setState({isPaused: true});
        navigate('EditCaption', {day: state.params.day, data: state.params.data, index: state.params.index});
    }
    componentWillMount() {
        const { state } = this.props.navigation;
        this.setState({
            images: state.params.data[2][state.params.day + 1],
            caption: state.params.data[3][state.params.day - 1]
        });
        if(state.params.data[0] < state.params.data[1] / Number.parseFloat(state.params.data[7])) this.setState({hasMedia: 'Add Media'});
        else this.setState({hasMedia: 'Edit Media'});
    }
    componentDidMount() {
        const { state } = this.props.navigation;
        this.tasksRef.child('task').child(this.props.screenProps[2]).orderByChild('id').equalTo(state.params.data[5]).on('value', (dataSnapShot) => {
            dataSnapShot.forEach((child) => {
                this.setState({caption: child.child('caption').val()[state.params.day - 1]});
            });
        });
    }
    renderMedia() {
        const { state } = this.props.navigation;
        if(state.params.data[2][0] == true) {
            return(
                <View style={styles.container}>
                    <Video style={styles.containerImg}  rate={1.0}                   // 0 is paused, 1 is normal.
                                                        volume={1.0}                 // 0 is muted, 1 is normal.
                                                        muted={false}                // Mutes the audio entirely.
                                                        paused={this.state.isPaused} // Pauses playback entirely.
                                                        resizeMode="cover"           // Fill the whole screen at aspect ratio.
                                                        repeat={true} source={{uri: this.state.images}} />
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
                </View>
            );
        }
        else {
            return(
                <Image style={styles.containerImg} source={{uri: this.state.images}} />
            );
        }
    }
    renderButton() {
        const { state } = this.props.navigation;
        if(state.params.data[1] == state.params.day) {
            return(
                <View style={styles.row}>
                    <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'blue'}} 
                            style={styles.button2}
                            onPress={()=>this.handleMedia()}>
                            {this.state.hasMedia}
                    </Button>
                    <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'rgba(0,0,0,0)',}} 
                            style={styles.button}/>
                    <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'blue'}} 
                            style={styles.button2}
                            onPress={()=>this.handleCaption()}>
                            Edit Caption
                    </Button>
                </View>
            );
        }
        else {
            return(
                <View style={styles.row}>
                    <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'blue'}} 
                            style={styles.button2}
                            onPress={()=>this.handleCaption()}>
                            Edit Caption
                    </Button>
                </View>
            );
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        var componentArray = [];
        var taskTitle = "Day " + state.params.day + ":";

        if(this.state.isLoading == true) return (<ProgressBarAndroid style={styles.progressBar} />);
        else {
            return(
                <Image style={styles.container} source={require('./Android Mobile 2.png')}>
                    <Text style={styles.text}>{taskTitle}</Text>
                    {this.renderMedia()}
                    <Text style={styles.text}>{this.state.caption}</Text>
                    {this.renderButton()}
                </Image>
            );            
        }        
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
    flex: 0.1,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    paddingBottom: 5
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    flexDirection: 'row',  
    backgroundColor: 'rgba(0,0,0,0)',
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
  progressBar: {
      width: 100,
      alignSelf: 'center'
  },
});