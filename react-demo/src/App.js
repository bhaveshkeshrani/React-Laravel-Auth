import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import './Styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "./Component/Form";
import Signup from "./Component/Signup";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Router>
              <Route path="/" exact component={Form}></Route>
              <Route path="/login" exact component={Form}></Route>
              <Route path="/signup" exact component={Signup}></Route>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
