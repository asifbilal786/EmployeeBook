/* @flow */

'use strict';

import React, {
  Component,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import reactMixin from 'react-mixin';

import { cssVar } from '../Lib/cssVar';

import DispatcherListener from '../Mixins/DispatcherListener'
import AppConstants from '../Constants/AppConstants'
import AppActions from '../Actions/AppActions'

import Icon from 'react-native-vector-icons/FontAwesome';
import { ABText } from '../Components/ABText'


export class AppNavigationButton extends Component {

  state: {
    updatedRoute:? Object
  };

  constructor(props) {
    super(props);
    this.state = {updatedRoute: null};
  }

  dispatchAction(action) {
    switch (action.actionType) {
      case AppConstants.NAVBAR_UPDATE:
          var route = this.state.updatedRoute || this.props.route;
          if (action.route.routePath === route.routePath) {
            this.setState({updatedRoute: action.route});
          }
        break;
      default:

    }
  }

  makeButton(item, style, callback) {

    var styleType;
    var text;
    var fontAwesomeIcon;

    if (item.icon) {
      styleType = styles.navBarIcon;
      text = item.icon;
    } else if (item.fontAwesomeIcon) {
      fontAwesomeIcon = item.fontAwesomeIcon
    }
     else {
      styleType = styles.navBarText;
      text = item.label;
    }



    var button = (
      <View style={style}>
        <ABText style={[styleType, styles.navBarButtonText, styles[text + 'NavBar'], item.disabled && styles.disabledText]}>
          { fontAwesomeIcon ? <Icon name={fontAwesomeIcon} size={24} color="white"/> : text}
        </ABText>
      </View>
    );

    if (item.disabled) {
      return button;
    }
    else {
      return (
        <TouchableOpacity onPress={callback}>
          {button}
        </TouchableOpacity>
      );
    }
  }

  renderRight() {

    var route = this.state.updatedRoute || this.props.route;
    if (!route.navRight) return null;

    return this.makeButton(route.navRight, styles.navBarRightButton, () => {
      AppActions.launchNavItem(route, route.navRight);
    })
  }

  renderLeft() {

    var route = this.state.updatedRoute || this.props.route;
    if (route.navLeft && !route.navBack) {
      return this.makeButton(route.navLeft, styles.navBarLeftButton, function() {
        AppActions.launchNavItem(route, route.navLeft);
      });
    }

    if (this.props.index === 0) {
      return null;
    }

    var backLabel = route.navBack || {icon: 'back'}; //{icon: 'caret-left-semi'};
    return this.makeButton(backLabel, styles.navBarLeftButton, this.goBack.bind(this));
  }

  goBack() {
    AppActions.goBack(this.props.navigator);
  }

  render() {

    switch (this.props.direction) {
      case 'left':
        return this.renderLeft();
      case 'right':
        return this.renderRight();
      default:
        throw("Unknown direction: " + this.props.direction);
    }
  }

}

var styles = StyleSheet.create({
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarIcon: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: cssVar('fontIcon')
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: 'white',
  },
  disabledText: {
    color: cssVar('gray30')
  }
});

reactMixin.onClass(AppNavigationButton, DispatcherListener)
