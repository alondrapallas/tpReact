import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Principal from './modules/Principal';
import Registro from './modules/Registro';


class App extends Component {

  render() {

    return (
      <div className="App">
        <NavBar />
        <Router>
          <Switch>
            <Route exact path="/" component={Principal} />
            <Route path="/Registro" component={Registro} />
          </Switch>
        </Router>  
      </div>
    );
  }
}

export default App;
