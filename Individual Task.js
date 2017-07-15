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

const options = {
    title: 'Select Image',
    storageOptions: {
        path: 'images'
    },
    noData: true,
    mediaType: 'photo'
};
export default class individualTask extends Component {
    static navigationOptions = {
        header: () => <Image style={styles.header} source={require('./Android Mobile 3.png')} />
    }
    constructor() {
        super();
        this.state = {
            images: []
        }
    }
    handlePress() {
        ImagePicker.launchCamera(options, (response) => {
            if (response.error) {
                alert("Oops, some unexpected errors occured!");
            } else if (response.didCancel) {

            } else {
                let source = {uri: response.uri};
                const uid = firebase.auth().currentUser.uid;
               // let uuid = firebase.storage().ref().child(uid).putString(source).then(function(snapshot){
                 //   alert("Image added successfully");
                //});
                firebase.database().ref().child('images').child(uid).push(source);
            }
        });
    }
    componentWillMount() {
        const uid = firebase.auth().currentUser.uid;
        let arr = this.state.images;
        firebase.database().ref().child('images').child(uid).on('child_added', function(snapshot) {
            //firebase.storage().ref().child(snapshot.val().imgUUID).getDownloadURL().then(function(url){
                arr.push(snapshot.val().uri);
                this.setState({
                    images: arr
                })
            //});
        }.bind(this));
    }
    render() {
        const { state } = this.props.navigation;
        var componentArray = [];
        var taskTitle = "Task: " + state.params.data[2];

        for(var i = 1; i <= Number.parseInt(state.params.data[5]); i++) {
            var day = "Day " + i + ":";
            componentArray.push(<DailyImages title={day} source={this.state.images[i-1]}/>);
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
                <Image style={styles.containerImg} source={{uri: this.props.source}} />
                <Text style={styles.text}>{this.props.title}</Text>
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
    containerImg: {
        resizeMode: 'stretch',
        height: 200,
        width: 200,
        alignSelf: 'center',
        marginTop: 5,
        borderRadius: 10
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
  }
});