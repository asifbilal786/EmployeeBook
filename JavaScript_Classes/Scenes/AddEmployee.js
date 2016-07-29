/* @flow */

'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import reactMixin from 'react-mixin';
import KeyboardListener from '../Mixins/KeyboardListener';
import AppActions from '../Actions/AppActions'
import EmployeeActions from '../Actions/EmployeeActions';
import Employee from '../Models/Employee'

import EmployeeListStore from '../Stores/EmployeeListStore';

import t from 'tcomb-form-native';

var Form = t.form.Form;

var EmployeeModal = t.struct({
  name: t.String,              // a required string
  designation: t.maybe(t.String),  // an optional string
  age: t.Number,               // a required number
  rememberMe: t.Boolean        // a boolean
});

export class AddEmployee extends Component {

  employeeToEdit: Employee;

  state: {
    value:? Object,
    options: Object
  };

  constructor(props) {
    super(props)

    this.state = {
      value: null,
      options: {}
    };

  }

  componentWillMount() {
    if (this.props.employeeId) {
      this.employeeToEdit = EmployeeListStore.getEmployee(this.props.employeeId);
      this.setState({
        value: {
          name: this.employeeToEdit.name,
          designation: this.employeeToEdit.designation,
          age: this.employeeToEdit.age
        }
      })

    }
  }

  isEditMode():boolean {
    return (this.employeeToEdit != null);
  }

  onChange(value) {
    this.setState({value});
  }

  onSavePressed() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      let modal:EmployeeModal = value;

      let employeeData = {
        name: modal.name,
        designation: modal.designation,
        age: modal.age
      }

      if (this.isEditMode()) {
        EmployeeActions.edit(this.employeeToEdit, employeeData)
      } else {
        EmployeeActions.create(employeeData)
      }
      AppActions.goBack(this.props.navigator);
    }
  }

  render() {
    return(
      <View style={styles.container}>
      <Form
        ref="form"
        type={EmployeeModal}
        value={this.state.value}
        options={this.state.options}
        onChange={this.onChange.bind(this)}
      />
      <TouchableHighlight
        style={styles.button}
        onPress={this.onSavePressed.bind(this)}
        underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

reactMixin.onClass(AddEmployee, KeyboardListener)
