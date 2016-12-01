import React, { Component } from 'react';
import {Button, IconButton} from 'react-toolbox/lib/button';
import TodoCard from './TodoCard';
import {browserHistory} from 'react-router';
import axios from 'axios';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {todoList: []};
  };

  handleClick() {
  	browserHistory.push('/new');
  }

  componentDidMount() {
    axios.get('http://localhost:3001/todos')
      .then(res => {
        console.log('---- data ----', res.data);
        this.setState({todoList: res.data});
      })
  };

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
            {
              this.state.todoList.map(function(todo) {
                return <TodoCard key={todo._id} dueDate={todo.dueDate.split('T')[0]} completedItems={todo.completedItems} totalItems={todo.totalItems}/>
              })
            }
          </div> 
        </div>
      </div>
    );
  }
}

export default Dashboard;
