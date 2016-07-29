/* @flow */

'use strict';


import React, {
  Component,
  View
} from 'react-native';

import reactMixin from 'react-mixin';
import NavigationBar from '../Navigation/NavigationBar';

// reactMixin.decorate(NavigationBar)

export class Home extends Component {
  constructor(props) {
    super(props)
  }
}

Home.defaultProps = {};
reactMixin.onClass(Home, NavigationBar);
// reactMixin(Home.prototype, NavigationBar);

/*

import React from 'react-native';
import NavigationBar from '../Navigation/NavigationBar';


var Home = React.createClass({
  mixins: [NavigationBar],

  getDefaultProps: function() {
    return {};
  },
});

module.exports = Home;
*/
