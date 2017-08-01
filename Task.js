import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  ProgressBarAndroid,
  View
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Button from 'react-native-button';


export default class task extends Component {
    constructor(props) {
      super(props);
      const firebaseApp = this.props.screenProps[0];
      this.tasksRef = firebaseApp.database().ref();
    }
    static newTask(navigation) {
        const {navigate} = navigation;
        navigate('NewTask');
    }
    static back(navigation) {
        const {goBack} = navigation;
        goBack();
    }
    static navigationOptions = {
        header: ({navigation}) => (
            <Image style={styles.header} source={require('./Android Mobile 3.png')}>
                <View style={styles.headerL}>
                    <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                            style={styles.button}
                            onPress={()=>{task.back(navigation)}}>Back</Button>
                </View>
                <View style={styles.headerR}>
                    <Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                            style={styles.button}
                            onPress={()=>{task.newTask(navigation)}}>+</Button>
                </View>
            </Image>
        ),
    }
    handlePress(i) {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        navigate('IndividualTask', {data: state.params.dataSet[i]});
    }
    render() {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        var buttonArray = [];

        for(let i = 1; i < state.params.dataSet.length; i++) {
          if(state.params.dataSet[i][0] < 1) {
            var title = "Task: " + state.params.dataSet[i][3] + " Day " + state.params.dataSet[i][1];
            buttonArray.push(<Button containerStyle={{padding:7, overflow:'hidden', borderRadius:30, backgroundColor: 'blue'}} 
                                     style={styles.button}
                                     onPress={()=>this.handlePress(i)}>
                                     {title}
                                     <ProgressBarAndroid styleAttr='Horizontal' indeterminate={false} progress={state.params.dataSet[i][0]} />
                             </Button>);
          }
        }
        return(
            <Image style={styles.container} source={require('./Android Mobile 2.png')}>
                <ScrollView contentConatainerStyle={styles.scroller}>
                    {buttonArray}
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
    justifyContent: 'center',
    alignItems: 'center', 
    flexDirection: 'row',  
    backgroundColor: 'rgba(0,0,0,0)',
    height: null,
    width: null,
    resizeMode: 'stretch'
  },
  headerL: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center', 
    flexDirection: 'row',  
    backgroundColor: 'rgba(0,0,0,0)',
    height: null,
    width: null,
    resizeMode: 'stretch'
  },
  headerR: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center', 
    flexDirection: 'row',  
    backgroundColor: 'rgba(0,0,0,0)',
    height: null,
    width: null,
    resizeMode: 'stretch'
  },
  button: {
    fontSize: 15,
    color: 'white'
  },
  scroller: {
    justifyContent: 'flex-start',
  }
});