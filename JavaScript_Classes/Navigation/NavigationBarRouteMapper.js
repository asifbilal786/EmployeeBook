/* @flow */

'use strict';

import React, {Text} from 'react-native';

import { cssVar } from '../Lib/cssVar';

import { AppNavigationButton } from './AppNavigationButton'
import { AppNavigationTitle } from './AppNavigationTitle'

export class NavigationBarRouteMapper {
  constructor() {
  }

  LeftButton(route: {}, navigator, index, navState) {
    return (<AppNavigationButton route={route} index={index} navigator={navigator} direction="left" />);
  }

  RightButton(route: {}, navigator, index, navState) {
    return (<AppNavigationButton route={route} index={index} navigator={navigator} direction="right" />);
  }

  Title(route, navigator, index, navState) {
    return (<AppNavigationTitle route={route}/>);
  }
}
