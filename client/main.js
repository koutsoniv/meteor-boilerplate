import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { routes, onAuthChange } from '../imports/routes/routes';
import { Session } from 'meteor/session';

import './main.html';
import '../imports/startup/simple-schema-configuration.js'

Tracker.autorun( () => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);

});

Meteor.startup(() => {
  ReactDOM.render (routes,document.getElementById('app'));
});