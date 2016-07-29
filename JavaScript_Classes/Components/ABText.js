/* @flow */

'use strict';

import React, {
  Component,
  Text
} from 'react-native';

import { cssVar } from '../Lib/cssVar';

export class ABText extends Component {
  constructor(props) {
    super(props)
  }

  setNativeProps() {
    var text = this.refs.text;
    text.setNativeProps.apply(text, arguments);
  }

  render() {
    return (
      <Text
      {...this.props}
      ref="text"
      style={[styles.text, this.props.style || {}]}/>
    )
  }

}

var styles = React.StyleSheet.create({
  text: {
    fontFamily: cssVar('fontRegular'),
    color: cssVar('gray90'),
    fontSize: 8                           // make it small to know it's not set
  }
});
