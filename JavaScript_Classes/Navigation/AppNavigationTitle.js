/* @flow */

'use strict';

import React, {
  Component,
  View,
  StyleSheet
} from 'react-native';

import { cssVar } from '../Lib/cssVar';

import reactMixin from 'react-mixin';
import { DispatcherListener } from '../Mixins/DispatcherListener'
import AppConstants from '../Constants/AppConstants'

import { ABText } from '../Components/ABText'

export class AppNavigationTitle extends Component {

  state: {
    updatedTitle:? Object
  };

  constructor(props) {
    super(props);
    console.log('App Navigation Title is called.');
    this.state = {updatedTitle: null};
  }

  dispatchAction(action) {
    switch(action.actionType) {
      case AppConstants.NAVBAR_UPDATE:
        if (action.route.routePath == this.props.route.routePath) {
          this.setState({updatedTitle: action.route.title});
        }
        break;
    }
  }

  render() {
    var title = this.state.updatedTitle || this.props.route.title;
    console.log('loading Navigation Title');
    console.log(title);
    return (
      <ABText style={styles.navBarTitleText}>
        {title}
      </ABText>
    );
  }
}

var styles = StyleSheet.create({
  navBarTitleText: {
    fontSize: 20,
    fontFamily: cssVar('fontRegular'),
    color: 'white',
    fontWeight: '500',
    marginVertical: 9,
  }
});

reactMixin.onClass(AppNavigationTitle, DispatcherListener)
