import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE_URL } from '../config';
import axios from 'axios';
export default class Signup extends React.Component {
  state = {
    errorMessage: '',
    classname:''
  }
  handleFormSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    let url = API_BASE_URL + '/signup';
    axios.post(url,data)
      .then(res => {
        if(res.data.msg == "success") {
          this.setState({errorMessage: "Signup Successful"});
          this.setState({classname: "alert alert-success"});
        } else {
          this.setState({errorMessage: "Signup Failed"});
          this.setState({classname: "alert alert-danger"});
        }
    })
  }
  render() {
    return (
        <form onSubmit={this.handleFormSubmit}>
            <h3>Signup</h3>
            { this.state.errorMessage && <div className={ this.state.classname } role="alert"> { this.state.errorMessage } </div> }
            <div className="form-group">
                <label>First name</label>
                <input type="text" name="fname" className="form-control" placeholder="First name" required/>
            </div>
            <div className="form-group">
                <label>Last name</label>
                <input type="text" name="lname" className="form-control" placeholder="Last name" required/>
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" className="form-control" placeholder="Enter email" required/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" id="password" className="form-control" placeholder="Enter password" required/>
            </div>
          <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
          <p className="forgot-password text-right">
              Already registered <a href="/login">sign in?</a>
          </p>
      </form>
    );
  }
}
// ReactDOM.render(<Form />, document.getElementById('root'));