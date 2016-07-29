/* @flow */

'use strict';

import Dispatcher from '../Dispatcher'

var DispatcherListener = {

  componentDidMount() {
    this._isMounted = true
    this.unregisterDispatcher()
    var self = this;
    this.dispatchToken = Dispatcher.register(this.dispatchedActionCallback.bind(this));
  },

  componentWillUnmount() {
    this._isMounted = false
    this.unregisterDispatcher()
  },

  unregisterDispatcher() {
    if (this.dispatchToken) {
      Dispatcher.unregister(this.dispatchToken);
      this.dispatchToken = null;
    }
  },

  dispatchedActionCallback(action) {
    if (this._isMounted) {
      if (action.targetPath) {
        if (this.props.currentRoute && this.props.currentRoute.routePath === action.targetPath) {
          this.dispatchAction(action);
        }
      } else {
        this.dispatchAction(action);
      }
    }
  },

}

module.exports = DispatcherListener;
