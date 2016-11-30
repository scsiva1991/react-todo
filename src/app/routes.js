import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import NewTodo from './components/NewTodo';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Dashboard}/>
    <Route path="/new" component={NewTodo}/>
  </Route>
);

export default routes;
