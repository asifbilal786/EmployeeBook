/* @flow */

'use strict';

import React from 'react';
import KeyboardEvents from 'react-native-keyboardevents';
var KeyboardEventEmitter = KeyboardEvents.Emitter;

var KeyboardListener = {
/*
  constructor(props) {
    super(props);
    this.state = { keyboardSpace: 0 };
  },
  */
  getInitialState() {
    return {
      keyboardSpace: 0
    };
  },
  
  componentDidMount() {
    this._isMounted = true
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
  },

  componentWillUnmount() {
    this._isMounted = false
    KeyboardEventEmitter.off(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
    KeyboardEventEmitter.off(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
  },

  isKeyboardVisible() {
    return this.state.keyboardSpace > 0;
  },

  updateKeyboardSpace(frames) {
    if (this._isMounted && frames && frames.end) {
      this.setState({keyboardSpace: frames.end.height});
    }
  },

  resetKeyboardSpace() {
    if (this._isMounted) {
      this.setState({keyboardSpace: 0});
    }
  },
};

module.exports = KeyboardListener;
