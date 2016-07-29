/* @flow */

'use strict';

import React, {
  Component,
  StyleSheet,
  ListView,
  Text,
  View,
  Modal,
  NavigatorIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

const myIcon = (<Icon name="plus" size={30} color="#900" />)

import { AddEmployee } from './AddEmployee'
import { EmployeeCell } from './EmployeeCell'
import Employee from '../Models/Employee'

import EmployeeListStore from '../Stores/EmployeeListStore';
import EmployeeActions from '../Actions/EmployeeActions';

import AppActions from '../Actions/AppActions'

export class EmployeesListing extends Component {

  employees: Array<Employee> = [];
  ds: ListView.DataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  state: {
    plusIcon: Object,
    modalVisible: boolean,
    dataSource: ListView.DataSource
  };

  constructor(props) {
      super(props);

      this.state = {
        plusIcon: {},
        modalVisible: false,
        dataSource: this.ds.cloneWithRows(this.employees)
      };

  }

  componentWillMount() {

    //Update Navigator object
    /*
    var route = this.props.navigator.navigationContext.currentRoute;
    route.title = 'Employee Listing'
    route.onRightButtonPress = () => {this.hanldeOnRightButtonPress()};

    Icon.getImageSource('plus', 30, 'white')
    .then((source) => {

      console.log('Plus image is just loaded.');
      this.setState({
        plusIcon: source
      })

      var route = this.props.navigator.navigationContext.currentRoute;
      route.rightButtonIcon = this.state.plusIcon;
      this.props.navigator.replace(route);

  });
    // route.rightButtonIcon = (<Icon name="plus" size={30} color="#4F8EF7" />)
    // route.rightButtonIcon = require('image!NavBarButtonPlus');
    // route.rightButtonIcon = myIcon;
    route.rightButtonIcon = route.bind(this.state.plusIcon);
    route.rightButtonTitle = 'Add Employee';
    this.props.navigator.replace(route);
    */
  }

  componentDidMount() {

    EmployeeListStore.addChangeListener(this.onChange.bind(this));

    this.reloadEmployees();

    // var route = this.props.navigator.navigationContext.currentRoute;
    // route.rightButtonIcon = myIcon.getImageSource;
    // route.rightButtonIcon = require('image!NavBarButtonPlus');
    // this.props.navigator.replace(route);
  }

  componentWillUnmount() {
    console.log('Component will unmount.');
    EmployeeListStore.removeChangeListener(this.onChange);
  }

  render() {
    console.log('render Listing View is called.');
    console.log(this.state.dataSource.getRowCount());


    return (
      <View style={styles.scene}>

      <Modal
      animated={true}
      visible={this.state.modalVisible}>
        <NavigatorIOS
          ref='navModal'
          barTintColor='green'
          style={styles.container}
          initialRoute={{
            title: 'Add Employee',
            component:  AddEmployee,
            leftButtonTitle: 'Cancel',
            onLeftButtonPress: () => {this.setState({ modalVisible: false})}
          }}
          />

      </Modal>

        <ListView
          enableEmptySections = {true}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={this.renderSeparator.bind(this)}
        />
      </View>
    );
  }

  // List View Render Methods

  renderRow(rowData: Employee) {
    console.log(rowData);
    return(
      <EmployeeCell
        key={rowData.id}
        employee={rowData}
        onEditPress={() => this.editEmployee(rowData)}
        onTrashPress={() => this.deleteEmployee(rowData)}
      />
    );
  }

  renderSeparator(sectionID:number, rowID:number) {
    console.log('render Separator with SectionID: ' + sectionID + ' & RowID: ' + rowID);
    return (
      <View key={'SEP_' + sectionID + '_' +  rowID} style={styles.rowSeparator}/>
    );

  }

  // Utility Methods

  hanldeOnRightButtonPress() {
    this.setState({ modalVisible: true})
  }

  reloadEmployees() {
    this.employees.slice()
    this.employees = EmployeeListStore.getAll();
    this.setState({
      dataSource: this.ds.cloneWithRows(this.employees)
    })
  }

  getItemProps(employee: Employee) {
    return {
      key: employee.id,
      title: "Edit Employee",
      subPath: "_editEmployee|"+ employee.id,
    }
  }

  onChange(data) {
    this.reloadEmployees()
  }

  editEmployee(employee: Employee) {

    EmployeeListStore.employeeToEdit = employee;

    var item = this.getItemProps(employee);
    item.currentRoute = this.props.currentRoute
    AppActions.launchRelativeItem(this.props.currentRoute, item);
  }

  deleteEmployee(employee: Employee) {
    EmployeeActions.delete(employee);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 5,
  },
  scene: {
    flex: 1,
    // backgroundColor: '#EAEAEA',
    backgroundColor: 'white'
  }
});
