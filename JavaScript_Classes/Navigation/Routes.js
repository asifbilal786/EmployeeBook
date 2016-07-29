/* @flow */

'use strict';

import { Router } from './Router';

import { EmployeesListing } from '../Scenes/EmployeesListing'
import { AddEmployee } from '../Scenes/AddEmployee'

var Home = {
    parse(host) {
      switch (host) {
        case 'Home':
        return Routes.startRoute()
        default:
          return null;
      }
    }
}

export class Routes {
  constructor() {

  }

  static EmployeesListing() {
    return {
      component: EmployeesListing,
      title: 'Employees Listing',
      navRight: {
        subPath: '_employee',
        label: '+',
        fontAwesomeIcon: 'plus'
      }
    };
  }

  static AddEmployee() {
    return {
      component: AddEmployee,
      title: 'Add Employee',
      navBack: {
        label: 'Cancel'
      }
    };
  }

  static EditEmployee(employeeId) {
    return {
      component: AddEmployee,
      title: 'Edit Employee',
      passProps: {
        employeeId: employeeId
      },
      navBack: {
        label: 'Cancel'
      }
    };
  }

  static listRoute(route, defaultRoute) {
    route.parse = function(path) {
      switch(path) {
        case '_employee':
          return Routes.AddEmployee();

        default:
          if (!defaultRoute) return null;
          return defaultRoute(path);
      }

      if(!route.navRight) {
        route.navRight = {
          subPath: '_employee',
          label: '+' // TODO: icon font
        };
      }

      return route;
    }

  }

  static startRoute() {
    var route = {}
    route._notAddressable = true;
    route._routerAppend = 'employeesListing';

    route.parse = function(path) {
      var childRoute;
      switch (path) {
        case 'employeesListing':
        // childRoute = Routes.listRoute(Routes.EmployeesListing(), function() {
        //   return null;
        // });
        childRoute = Routes.EmployeesListing();
        childRoute.parse = function(path) {

          var pieces = path.split("|");
          path = pieces[0];

          switch(path) {
            case '_employee':
              return Routes.AddEmployee();

            case '_editEmployee':
              var employeeId = pieces[1]
              return Routes.EditEmployee(employeeId);

            default:
              if (!defaultRoute) return null;
              return defaultRoute(path);
          }
        };
          break;
        default:
          return null;
      };

      return childRoute;
    }
    return route

  }

  static parse(str, defaulted) {
    var found = Router.parse(str, Home, defaulted);
    if (!found && defaulted) {
      found = this.parse('Home', false)
    }
    return found;
  }

}
