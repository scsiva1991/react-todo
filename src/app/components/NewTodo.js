 import React, { Component } from 'react';
import {Button, IconButton} from 'react-toolbox/lib/button';
import {browserHistory} from 'react-router';
import DatePicker from 'react-toolbox/lib/date_picker';
import Input from 'react-toolbox/lib/input';
import axios from 'axios';

class NewTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {dueDate: '', task: '', todoId: ''};
  };

 handleChange(item, value) {
   console.log(item, value);
   this.setState({[item]: value});

   let obj = {};
   obj.dueDate = value;
   obj.user = 'siva';

   console.log('-- obj --', obj);

   axios.post('http://localhost:3001/saveTodo', obj)
     .then(res => {
       console.log('---- data ----', res);
        this.setState({todoId: res.data.todo._id});
     });

 };

 handleTaskChange(item, value) {
   console.log(this.state);
   this.setState({[item]: value});
 };

 addTask() {

   let obj = {};
   obj.task = this.state.task;
   obj._todoId = this.state.todoId;
   obj.isCompleted = false;

   console.log('----------- obj --------', obj);

   axios.post('http://localhost:3001/saveTask', obj)
     .then(res => {
       console.log('---- data ----', res);
     });
 };

  render() {

    const today = new Date();
    const yesterday = today.getDate();
    console.log('-- yesterday --', yesterday);
    const minDate = new Date(today.getFullYear(), today.getMonth(), yesterday);

    const divCenter = {
      'margin': '100px auto' ,
      'textAlign': 'center'
    };

    const marginTop50 = {
      'marginTop': '50px'
    };

    return (
      <div className="container-fluid">
        <Button label='Back' style={marginTop50} flat primary onClick={ this.addTask.bind(this) } />
        <div className="row" style={divCenter}>
            <div className="col-xs-12 col-md-8 col-md-offset-2">
              <h4>Please select date to continue</h4>
              <DatePicker
                label='Todo Date'
                onChange={this.handleChange.bind(this, 'dueDate')}
                value={this.state.dueDate}
                minDate={minDate}
                inputFormat={(value) => `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}
                sundayFirstDayOfWeek
              />
            <div className="row">
              <div className="col-xs-8 col-md-10">
                <Input type='text' multiline value={this.state.task} onChange={this.handleTaskChange.bind(this, 'task')} />
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
