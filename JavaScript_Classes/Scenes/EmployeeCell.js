/* @flow */

'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import Employee from '../Models/Employee'

export class EmployeeCell extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let employee:Employee = this.props.employee
    return(
      <View style={styles.rowContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}> {employee.name}</Text>
          <Text style={styles.subtitle}> {employee.designation}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Icon.Button name="edit" size={20} color="#23B4D2" backgroundColor="rgba(0,0,0,0)" onPress={this.props.onEditPress}/>
          <Icon.Button name="trash" size={20} color="#23B4D2" backgroundColor="rgba(0,0,0,0)" onPress={this.props.onTrashPress}/>
        </View>

      </View>
    );
  }
}

// Style Sheet
const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    // height: 180,
    // justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2'
  },
  leftContainer: {
    flex: 1
  },
  rightContainer: {
    width: 50,
    // height: 100,
    justifyContent: 'space-between'
    // justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    color: '#000'
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
    color: '#656565'
  },
});
