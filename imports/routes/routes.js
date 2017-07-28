import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Classrooms from '../ui/Classrooms';


const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/classrooms'];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/classrooms');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace('/classrooms');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  };
};


export const routes = ( //in reactrouter v4 we need to wrap all routes in a single div
  <Router history={browserHistory}>
        <Route exact path ='/' component={Login} onEnter={onEnterPublicPage}/>
        <Route exact path ='/signup' component={Signup} onEnter={onEnterPublicPage}/>
        <Route exact path ='/classrooms' component={Classrooms} onEnter={onEnterPrivatePage}/>
  </Router>
);
