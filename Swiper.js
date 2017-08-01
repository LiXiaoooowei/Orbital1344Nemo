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
                 paused={this.state.isPaused} // Pauses playback entirely.
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
        <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                style={styles.button}
                onPress={()=>this.props.navigation.dispatch(resetAction)}>Home</Button>
      </View>
    )
  }
}

export default class Tinder extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          count: 2
      }
  }
  handleAccept () {
    this.setState({count: (this.state.count + 1)})
    const { navigate } = this.props.navigation;
    var url = this.props.url[this.state.count];
    navigate('Share', {uri: url});
  }

  handleReject () {
  }

  render() {
    return (
      <SwipeCards
        cards={this.props.media}
        renderCard={(mediaObject) => <Card media={mediaObject.uri} isVid={mediaObject.isVid} />}
        renderNoMoreCards={() => <NoMoreCards navigation={this.props.navigation}/>}
        handleYup={()=>this.handleAccept()}
        handleNope={this.handleReject}
      />
    )
  }
}


const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderColor: '#ea394b',
    borderWidth: 2,
    backgroundColor: '#04b1ff',
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
  button: {
    alignItems: 'center',
    fontSize: 15,
    color: 'white'
  }
})

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'})
  ]
});