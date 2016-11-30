import React, { Component } from 'react';
import {Button, IconButton} from 'react-toolbox/lib/button';
import TodoCard from './TodoCard';
import {browserHistory} from 'react-router';

class Dashboard extends Component {
  handleClick() {
  	browserHistory.push('/new');
  }

  render() {
    const divCenter = {
      'margin': '100px auto' ,
      'textAlign': 'center'
    };

    const appTitle = {
      'fontSize': '50px',
      'fontWeight': 'bold'
    };

    return (
      <div className="container-fluid">
        <div className="row">
          <div style={divCenter}>
            <p style={appTitle}>TODO APP</p>
            <div>
              <Button onClick={ this.handleClick } label='Click here to create a new TODO list' flat primary />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <TodoCard/>
          </div>

        </div>
      </div>
    );
  }
}

export default Dashboard;
