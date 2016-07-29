/* @flow */

'use strict';

import React, {
  Component,
  View
} from 'react-native';

import reactMixin from 'react-mixin';
import DispatcherListener from './Mixins/DispatcherListener'

import { Routes } from './Navigation/Routes';
import { AppActions } from './Actions/AppActions'

import Launcher from './Root/Launcher'
import { Home } from './Root/Home'


export class Root extends Component {
  state: {
    routeStack:? Object
  };

  constructor(props) {
    super(props);

    this.state = {routeStack: null};
  }

  render() {
    var routeStack = this.state.routeStack;
    if (!routeStack) {
      routeStack = this.getDefaultRouteStack();
    }
    return (
      <Home ref="current" routeStack={routeStack}/>
    );
  }

  dispatchAction(action:{}) {
    Launcher.launch(this, action);
  }

  getDefaultRouteStack() {
    return Routes.parse(null, true, true);
  }

}

reactMixin.onClass(Root, DispatcherListener)
