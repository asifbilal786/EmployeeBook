/* @flow */

'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator,
  ListView
} from 'react-native';

import { Root } from './JavaScript_Classes/Root';

import Icon from 'react-native-vector-icons/FontAwesome'

/*
var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }
    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => navigator.push(newRandomRoute())}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          <Icon name='plus' size={30} color='white' />
        </Text>
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

}
*/
class EmployeeBook extends Component {

  state: {
    modalVisible:boolean
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      /*
      <Navigator
        ref='nav'
        style = {styles.appContainer}
        //barTintColor='green'
        //style={styles.container}
        //titleTextColor='#fff'
        //tintColor='#fff'
        initialRoute = {{
          title: 'Employee Listing',
          index: 0
        }}
        renderScene = {(route, navigator) =>
          <EmployeesListing navigator = {navigator} title = {route.title} name = {route.title} />
        }
        configureScene={( route ) => {
          if ( route.sceneConfig ) {
            return route.sceneConfig;
          }
            return Navigator.SceneConfigs.FloatFromRight;
          }
        }
        navigationBar = { <Navigator.NavigationBar routeMapper = {NavigationBarRouteMapper} style={styles.navBar}/>}
        />*/

        <Root ref="current"/>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  navBar: {
    backgroundColor: 'green',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    // color: '#5890FF',
    color: 'white',
  },
  appContainer: {
    flex: 1
  }
});
// AppRegistry.registerComponent('EmployeeBook', () => EmployeeBook);
AppRegistry.registerComponent('EmployeeBook', () => Root);
