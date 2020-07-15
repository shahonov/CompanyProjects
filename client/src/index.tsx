import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { BrowserRouter, Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { Home } from './components/Home';
import { Companies } from './components/Companies';
import { Projects } from './components/Projects';
import { Employees } from './components/Employees';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <BrowserRouter>
      <Route component={Home} path={'/home'} />
      <Route component={Companies} path={'/companies'} />
      <Route component={Projects} path={'/projects'} />
      <Route component={Employees} path={'/employees'} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
