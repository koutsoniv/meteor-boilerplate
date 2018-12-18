import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Switch, Route, withRouter } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router';

import Signup from '../ui/signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/login';

const history = createHistory();
const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/dashboard'];

export const onAuthChange = (isAuthenticated) => {
    console.log ('is Authenticated', isAuthenticated);
    const pathName = history.location.pathname;
  
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
    const isAuthenticatedPage = authenticatedPages.includes(pathName);
  
    
   if (isUnauthenticatedPage && isAuthenticated ){
    history.replace('/dashboard');
   } else if (isAuthenticatedPage && !isAuthenticated) {
     history.replace('/');
   }
  
}

export const routes = (
  <Router history={history}>
  <div>
      <Switch>
      <Route exact path="/" render={() => {
        return Meteor.userId() ? <Redirect to="/links" /> : <Login />
      }} />
      <Route path="/signup" render={() => {
        return Meteor.userId() ? <Redirect to="/links" /> : <Signup />
      }} />
       <Route path="/dashboard" render ={ () => {
         return !!!Meteor.userId() ? <Redirect to="/" /> : <Dashboard/>
       }} />
      <Route path="*" component={NotFound} />
      </Switch>
    </div>
  </Router>
);
