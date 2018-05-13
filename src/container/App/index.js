import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {someRestFulApi} from '../../utils/api';
import appAction from './action';
import logo from '../../logo.svg';
import { Table } from 'rsuite';
import './style.less';
import mockData from './mock'
const { Column, HeaderCell, Cell, Pagination } = Table;
class App extends Component {

  requestHandler = () => {
    const {Actions} = this.props;
    Actions.appAction('GET', someRestFulApi, {});
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Table
          height={400}
          data={mockData}
          onRowClick={data => {
            console.log(data);
          }}
        >
          <Column width={70} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={200} fixed>
            <HeaderCell>First Name</HeaderCell>
            <Cell dataKey="firstName" />
          </Column>

          <Column width={200}>
            <HeaderCell>Last Name</HeaderCell>
            <Cell dataKey="lastName" />
          </Column>

          <Column width={200}>
            <HeaderCell>City</HeaderCell>
            <Cell dataKey="city" />
          </Column>

          <Column width={200}>
            <HeaderCell>Street</HeaderCell>
            <Cell dataKey="street" />
          </Column>

          <Column width={300}>
            <HeaderCell>Company Name</HeaderCell>
            <Cell dataKey="companyName" />
          </Column>

          <Column width={300}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.appReducer;

const mapActionToProps = (dispatch) => ({
  Actions: bindActionCreators({appAction}, dispatch)
});

export default connect(mapStateToProps, mapActionToProps)(App);
