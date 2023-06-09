import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <div className="div-image">
          <Route exact path="/" component={ Login } />
          <Route exact path="/carteira" component={ Wallet } />
        </div>
      </Switch>
    );
  }
}

export default connect()(App);
