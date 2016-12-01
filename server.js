//server.js
'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Todo = require('./model/Todo');
var Task = require('./model/Task');

//and create our instances
var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;
mongoose.connect('mongodb://localhost:27017/todo');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

//Create a todo master entry for a date
router.route('/saveTodo')
  .post(function(req, res) {
    var todo = new Todo();
    (req.body.dueDate) ? todo.dueDate = req.body.dueDate : null;
    (req.body.user) ? todo.user = req.body.user : null;
    todo.save(function(err, todo) {
      if (err)
        res.send(err);
      res.json({ message: 'Todo successfully added!', status: 'success' , todo: todo});
    });
  });

//Save task for a todo
router.route('/saveTask')
  .post(function(req, res) {
    if( req.body._todoId == null)
      res.send({ message: 'Please select date ', status: 'error'});

    var task = new Task();
    (req.body.task) ? task.task = req.body.task : null;
    (req.body._todoId) ? task._todoId = req.body._todoId : null;

    task.save(function(err, task) {
      if (err)
        res.send(err);

      // To increase the items count in todo
      Todo.findByIdAndUpdate({ _id: task._todoId }, {$inc: {totalItems:1}}, function (err, data) {
        console.log('------ data --------', data);
      });

      res.json({ message: 'Task successfully added!', status: 'success' });
    });
  });

  router.route('/todos')
    .get(function(req, res) {
      //looks at our Comment Schema
      Todo.find(function(err, todos) {
        if (err)
          res.send(err);
        //responds with a json object of our database comments.
        res.json(todos)
      });
    })

router.route('/tasks/:dueDate')
  .get(function(req, res) {
    //looks at our Comment Schema
    Task.find({ 'task': req.params.dueDate}, function(err, tasks) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(tasks)
    });
  })

//Use our router configuration when we call /api
app.use('/', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
