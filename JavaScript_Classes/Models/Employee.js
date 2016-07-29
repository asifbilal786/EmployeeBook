/* @flow */

'use strict';

export default class Employee {

  id: number;
  name: string;
  designation: string;
  age: number;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.designation = data.designation;
    this.age = data.age;
  }

  edit(data) {
    this.name = data.name;
    this.designation = data.designation;
    this.age = data.age;
  }

}
