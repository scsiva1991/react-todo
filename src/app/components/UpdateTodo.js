import React, { Component } from 'react';
import {Button, IconButton} from 'react-toolbox/lib/button';
import {browserHistory} from 'react-router';
import DatePicker from 'react-toolbox/lib/date_picker';
import Input from 'react-toolbox/lib/input';
import axios from 'axios';
import TaskListItem from './TaskListItem';
import {Snackbar } from 'react-toolbox';

class UpdateTodo extends Component {

  constructor(props) {
    super(props);
    this.state = {task: '', todoId: '', taskList: [], message: '', active: false};
  };

  goBack() {
  	browserHistory.push('/');
  }

  handleTaskChange(item, value) {
    this.setState({[item]: value});
  };

  handleSnackbarClick = (event, instance) => {
   this.setState({ active: false });
 };

 handleSnackbarTimeout = (event, instance) => {
   this.setState({ active: false });
 };


  addTask() {

    if(this.state.task != '') {
      let obj = {};
      obj.task = this.state.task;
      obj._todoId = this.state.todoId;
      obj.isCompleted = false;

      this.setState({taskList: this.state.taskList.concat(obj)});
      this.setState({task: ''});

      axios.post('http://192.168.1.249:3001/saveTask', obj)
        .then(res => {
          console.log('---- data ----', res);
          this.setState({message: res.data.message});
          this.setState({ active: true });
        });
    }

  };

  componentDidMount() {
    const id = this.props.params.id;
    this.setState({todoId: id});
    console.log(id);
    axios.get('http://192.168.1.249:3001/tasks/'+id)
      .then(res => {
        console.log('---- data ----', res.data);
        this.setState({taskList: res.data});
      })
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

    return(
      <div className="container-fluid">
        <Button label='Back' style={marginTop50} flat primary onClick={ this.goBack.bind(this) } />
        <div className="row" style={divCenter}>
            <div className="col-xs-12 col-md-8 col-md-offset-2">
            <div className="row">
              <div className="col-xs-8 col-md-10">
                <Input type='text' multiline value={this.state.task} onChange={this.handleTaskChange.bind(this, 'task')} />
              </div>
              <div className="col-xs-4 col-md-2">
                 <Button label='Add' raised primary onClick={ this.addTask.bind(this) } />
              </div>
            </div>
            <div className="row">
              {
                this.state.taskList.map(function(task, i) {
                  return <TaskListItem key={i} task={task.task}/>
                })
              }
            </div>
          </div>
        </div>
        <Snackbar
          action='Dismiss'
          active={this.state.active}
          label={this.state.message}
          timeout={2000}
          onClick={this.handleSnackbarClick}
          onTimeout={this.handleSnackbarTimeout}
          type='cancel'
        />
      </div>
    );
  }
}

module.exports = UpdateTodo;
