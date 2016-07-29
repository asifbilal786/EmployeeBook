/* @flow */

'use strict';

import Dispatcher from '../Dispatcher'
import AppConstants from '../Constants/AppConstants';
import assign from 'object-assign';

var EmployeeActions = {

  create(employeeData) {

    var action = {
      actionType: AppConstants.EMPLOYEE_ADDED,
      dataProps: employeeData
    }

    Dispatcher.dispatch(action);
  },

  edit(employee, employeeData) {

    var action = {
      actionType: AppConstants.EMPLOYEE_EDITED,
      employee: employee,
      dataProps: employeeData
    }

    Dispatcher.dispatch(action);
  },

  delete(employee) {

    var action = {
      actionType: AppConstants.EMPLOYEE_DELETED,
      employee: employee
    }

    Dispatcher.dispatch(action);

  }

}

module.exports = EmployeeActions;
