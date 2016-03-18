var React = require('react/addons');
var ReactApp = require('./components/ReactApp');

var mountNode = document.getElementById('react-main-mount');
var patients = require('./data/patients.js').patients;

React.render(new ReactApp({ data: patients }), mountNode);
