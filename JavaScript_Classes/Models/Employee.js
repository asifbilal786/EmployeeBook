/* @flow */

'use strict';

import Utils from '../Utils/Utils';

export default class Employee {

  id: string;
  name: string;
  designation: string;
  age: int;

  constructor(data) {
    this.id = Utils.guid();
    if (data) {
      this.name = data.name;
      this.designation = data.designation;
      this.age = data.age;
    }

  }

  edit(data) {
    this.name = data.name;
    this.designation = data.designation;
    this.age = data.age;
  }
}
