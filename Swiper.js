import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image
} from 'react-native';
import Button from 'react-native-button';
import Video from 'react-native-video';
import SwipeCards from 'react-native-swipe-cards';
import { NavigationActions } from 'react-navigation';

class Card extends Component {
  render() {
    if(this.props.isVid) {
      return (
        <View style={styles.card}>
          <Video style={styles.container} 
                 rate={1.0}                   // 0 is paused, 1 is normal.
                 volume={1.0}                 // 0 is muted, 1 is normal.
                 muted={false}                // Mutes the audio entirely.
                 paused={this.props.isPaused} // Pauses playback entirely.
                 resizeMode="cover"           // Fill the whole screen at aspect ratio.
                 repeat={true} source={{uri: this.props.media}} />
        </View>
      );
    }
    else {
      return (
        <View style={styles.card}>
          <Image style={styles.container} source={{uri: this.props.media}} />
        </View>
      );
    }    
  }
}

class NoMoreCards extends Component {
  render() {
    return (
      <View>
        <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'blue'}} 
                style={styles.button2}
                onPress={()=>this.props.navigation.dispatch(resetAction)}>Home</Button>
      </View>
    )
  }
}

export default class Tinder extends React.Component {
  constructor(props) {
      super(props);
      const firebaseApp = this.props.firebase;
      this.tasksRef = firebaseApp.database().ref();
      this.state = {
          count: 2,
          caption: '',
          isPaused: false
      }
  }
  handleAccept () {
    this.setState({count: (this.state.count + 1)});
    const { navigate } = this.props.navigation;
    var url = this.props.url[this.state.count];
    var capt = this.props.caption[this.state.count-2];
    this.setState({caption: this.props.caption[this.state.count-1]});
    navigate('Share', {uri: url, caption: capt});
  }

  handleReject () {
    this.setState({caption: this.props.caption[this.state.count-1]});
    this.setState({count: (this.state.count + 1)});
  }

  handleCaption() {
      const { navigate } = this.props.navigation;
      const { state } = this.props.navigation;
      this.setState({isPaused: true});
      navigate('EditCaption', {day: this.state.count-1, data: this.props.data, index: this.props.index});
  }
  componentWillMount() {
    this.setState({caption: this.props.caption[0]});
  }
  componentDidMount() {
      this.tasksRef.child('task').child(this.props.user).orderByChild('id').equalTo(this.props.data[5]).on('value', (dataSnapShot) => {
          dataSnapShot.forEach((child) => {
                this.setState({caption: child.child('caption').val()[this.state.count-2]});
          });
      });
  }
  renderPlayPause() {
    if(this.props.url[0] == true) {
      return(
        <View style={styles.row2}>
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
      );
    }
  }
  render() {
    return (
      <View style={styles.container2}>
        <Text style={styles.text}>Swipe right to share, swipe left to ignore</Text>
        <SwipeCards
          cards={this.props.media}
          renderCard={(mediaObject) => <Card media={mediaObject.uri} 
                                             isVid={this.props.url[0]}
                                             isPaused={this.state.isPaused} />}
          renderNoMoreCards={() => <NoMoreCards navigation={this.props.navigation}/>}
          handleYup={()=>this.handleAccept()}
          handleNope={()=>this.handleReject()}
        />
        <Text style={styles.text}>{this.state.caption}</Text>
        {this.renderPlayPause()}
        <View style={styles.row}>
            <Button containerStyle={{padding:10, overflow:'hidden', borderRadius:15, backgroundColor: 'blue'}} 
                    style={styles.button2}
                    onPress={()=>this.handleCaption()}>
                    Edit Caption
            </Button>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    resizeMode: 'stretch',
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 10
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    height: null,
    width: null,
    resizeMode: 'stretch'
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    flexDirection: 'row',  
    backgroundColor: 'rgba(0,0,0,0)',
  },
  row2: {
    flex: 0.3,
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
  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  },
})

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'})
  ]
});