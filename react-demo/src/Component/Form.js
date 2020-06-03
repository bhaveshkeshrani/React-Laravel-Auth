import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE_URL } from '../config';
import axios from 'axios';
export default class Form extends React.Component {
  state = {
    errorMessage: '',
    classname:''
  }
  getLoginData = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    let url = API_BASE_URL + '/login';
    axios.post(url,data)
      .then(res => {
        if(res.data.msg == "success") {
          this.setState({errorMessage: "Login Successful"});
          this.setState({classname: "alert alert-success"});
        } else {
          this.setState({errorMessage: "Login Failed"});
          this.setState({classname: "alert alert-danger"});
        }
    })
  }
  render() {
    return (
       <form onSubmit={this.getLoginData}>
          <h3>Login</h3>
          { this.state.errorMessage && <div className={ this.state.classname } role="alert"> { this.state.errorMessage } </div> }
          <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" className="form-control" placeholder="Enter email" required/>
          </div>

          <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" className="form-control" placeholder="Enter password" required/>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Login</button>
          <p className="forgot-password text-right">
              Don't have account yet <a href="/signup">Sign Up?</a>
          </p>
      </form>
    );
  }
}
// ReactDOM.render(<Form />, document.getElementById('root'));