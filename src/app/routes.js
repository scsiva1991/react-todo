import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import NewTodo from './components/NewTodo';
import UpdateTodo from './components/UpdateTodo';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Dashboard}/>
    <Route path="/new" component={NewTodo}/>
    <Route path="tasks" >
        <IndexRoute component={UpdateTodo}/>
        <Route path=":id" component={UpdateTodo}/>
    </Route>
  </Route>
);

export default routes;
