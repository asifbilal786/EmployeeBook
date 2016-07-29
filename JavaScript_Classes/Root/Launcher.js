/* @flow */

'use strict';

import AppConstants from '../Constants/AppConstants';
import { Routes } from '../Navigation/Routes';

export default class Launcher {

  static launch(root, action) {
    switch(action.actionType) {
      case AppConstants.LAUNCH_ROUTE_PATH:
        var routePath = action.routePath;
        var parsed = Routes.parse(routePath, false);
        if (!parsed) {
          alert("Unknown route: " + routePath);
        }
        else {
          root.setState({routeStack: parsed});
        }
        break;
        /*
      case AppConstants.NETWORK_ACTIVITY:
        StatusBar.setNetworkActive(action.isActive);
        break;
      case AppConstants.OPEN_URL:
        var url = action.url;
        Linking.openURL(url)
        break;
*/
      default:
        break;
    }
  }
};
