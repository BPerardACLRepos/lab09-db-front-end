import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Header from './Header.js';
import ListPage from './ListPage.js';
// import DetailsPage from './DetailsPage.js';
// import CreatePage from './CreatePage.js';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route
              path="/"
              exact
              component={ListPage}
            />
            {/* <Route
              path="/details/:gameId"
              exact
              component={DetailsPage}
            />
            <Route
              path="/create"
              exact
              component={CreatePage}
            /> */}
          </Switch>
        </Router>
      </div>
    )
  }
}