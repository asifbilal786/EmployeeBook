/* @flow */

'use strict';

import React, {
  AlertIOS
} from 'react-native';

export function showAlert(title: ?string, message?: ?string, buttons:Object) {
    AlertIOS.alert(title, message, buttons);
}
