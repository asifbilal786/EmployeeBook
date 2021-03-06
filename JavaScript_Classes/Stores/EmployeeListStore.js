/* @flow */

'use strict';

import { EventEmitter } from 'events';

import assign from 'object-assign';

import Realm from 'realm';

import Employee     from '../Models/Employee';
import Dispatcher   from '../Dispatcher';
import AppConstants from '../Constants/AppConstants';

var CHANGE_EVENT = 'change';

Employee.schema = {
  name: 'Employee',
  properties: {
    id: {type: 'string', indexed: true},
    name:    {type: 'string'},
    designation: {type: 'string'},
    age: {type: 'int', optional: true},
  }
};

let realm = new Realm({schema: [Employee]})



var _employees:Array<Employee> = fetchPreRenderedEmployess();

function fetchPreRenderedEmployess() {

  var employees = [];
  var names = ['Asif Bilal', 'Ahmad Hussain', 'Imran Khan', 'Rehmat Qadir'];
  var designations = ['Software Engineer', 'Project Manager', 'General Manager', 'ROR Developer'];
  var ages = [20, 30, 40, 50];

  for (var i = 0; i < 4; i++) {

    let data = {
      id: i+1,
      name: names[i],
      designation: designations[i],
      age: ages[i]
    }

    addEmployee(i, data)
  }
  console.log('New Employees fetched here in the Store.');

  return employees;

}

function addEmployee(id, employeeData) {
  employeeData.id = id;
  var employee = new Employee(employeeData);

  realm.write(() => {
      realm.create('Employee', employee);
  })
  return employee;
}

function editEmployee(employee:Employee, employeeData) {

  realm.write(() => {
      employee.edit(employeeData)
    });
  return employee
}

function deleteEmployee(employee:Employee) {

  realm.write(() => {
    realm.delete(employee);
  });
  /*
  let index = _employees.indexOf(employee)
  if (index != -1) {
    _employees.splice(index, 1);
    return index;
  }*/
}

var EmployeeStore = assign({}, EventEmitter.prototype, {
  getAll() {
    return realm.objects('Employee');
  },

  getEmployee(employeeId) {
    return _employees.filter(employee => employee.id == employeeId)[0];
  },

  emitChange(data) {
    this.emit(CHANGE_EVENT, data);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

function handleAction(action) {
  switch(action.actionType) {

    case AppConstants.EMPLOYEE_ADDED:
      let newEmployee = addEmployee(11, action.dataProps);
      EmployeeStore.emitChange(newEmployee);
      break;

    case AppConstants.EMPLOYEE_EDITED:
        let editedEmployee = editEmployee(action.employee, action.dataProps);
        EmployeeStore.emitChange(editedEmployee);
        break;

    case AppConstants.EMPLOYEE_DELETED:
      let deletedIndex = deleteEmployee(action.employee);
      EmployeeStore.emitChange(deletedIndex);
      break;

        default:
      // no op
    }
}

// Register callback to handle all updates
Dispatcher.register(handleAction);

module.exports = EmployeeStore;
