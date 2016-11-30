import React, { Component } from 'react';
import {Button, IconButton} from 'react-toolbox/lib/button';
import {browserHistory} from 'react-router';
import DatePicker from 'react-toolbox/lib/date_picker';
import Input from 'react-toolbox/lib/input';
import axios from 'axios';

class NewTodo extends Component {

  constructor(props) {
    super(props);
    this.state = {dueDate: '', task: ''};
  };

 handleChange(item, value) {
   console.log(item, value);
   this.setState({[item]: value});

 };

 addTask() {
   console.log(this.state);
   let obj = {};
   obj.task = this.state.task;
   obj.dueDate = this.state.dueDate;

   axios.post('http://localhost:3001/saveTask', obj)
     .catch(err => {
       console.error(err); 
     });
 };

  render() {
    const divCenter = {
      'margin': '100px auto' ,
      'textAlign': 'center'
    };

    return (
      <div className="container-fluid">
        <div className="row" style={divCenter}>
            <div className="col-xs-12 col-md-8 col-md-offset-2">
              <h4>Please select date to continue</h4>
              <DatePicker
                label='Todo Date'
                onChange={this.handleChange.bind(this, 'dueDate')}
                value={this.state.dueDate}
                inputFormat={(value) => `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}
                sundayFirstDayOfWeek
              />
            <div className="row">
              <div className="col-xs-8 col-md-10">
                <Input type='text' multiline value={this.state.task} onChange={this.handleChange.bind(this, 'task')} />
              </div>
              <div className="col-xs-4 col-md-2">
                 <Button label='Add' raised primary onClick={ this.addTask.bind(this) } />
              </div>
            </div>

            </div>
        </div>
      </div>
    );
  }
}

module.exports = NewTodo;
