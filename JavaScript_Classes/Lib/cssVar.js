/* @flow */

'use strict';

import invariant from 'invariant'
import CSSVarConfig from './CSSVarConfig'

export function cssVar(key: string) : string {
  invariant(CSSVarConfig[key], 'invalid css variable ' + key);
  return CSSVarConfig[key];
}
