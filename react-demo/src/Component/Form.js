import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE_URL } from '../config';
import axios from 'axios';
export default class Form extends React.Component {
  state = {
    errorMessage: '',
    classname:'',
    data:[],
    fname :'',
    email :'',
    message :'',
    selectedId:''
  }
  componentDidMount() {
    this.getLoginData();
  }
  saveFeedBackData = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    var url='';
    if(this.state.selectedId) {
      url = API_BASE_URL + '/updateFeedBack';
    } else {
      url = API_BASE_URL + '/saveFeedBack';
    }
    axios.post(url,data)
      .then(res => {
        if(res.data.success) {
          this.setState({errorMessage: "Feedback Successful saved"});
          this.setState({classname: "alert alert-success"});
          setTimeout(
            function() {
                this.setState({ selectedId: '', fname :'', email :'',message :'', errorMessage: "",  classname: ""});
            }
            .bind(this),
            2000
          );
        } else {
          this.setState({errorMessage: "Something went wrong"});
          this.setState({classname: "alert alert-danger"});
        }
    })
    this.getLoginData();
  }
  getLoginData() {
    let url = API_BASE_URL + '/list';
    axios.get(url)
      .then(res => {
        if(res) {
          this.setState({data: res.data});
        }
    })
  }
  render() {
    const { data }= this.state;
    const items = data.map(item => {
      return (
        <tr key={item.fid}>
          <th scope="row">{item.fid}</th>
          <td>{item.FullName}</td>
          <td>{item.Email}</td>
          <td>{item.Message}</td>
          <td><button type="button" className="btn btn-primary" onClick={() => this.setState({ selectedId: item.fid, fname :item.FullName, email :item.Email,message :item.Message })}>edit</button></td>
        </tr>
        )
      })
    return (
      <div className="col-md-12">
       <form onSubmit={this.saveFeedBackData}>
          <h3>Feedback</h3>
          { this.state.errorMessage && <div className={ this.state.classname } role="alert"> { this.state.errorMessage } </div> }
          <div className="form-group">
              <label>Fullname</label>
              <input type="text" name="fname" className="form-control" value={this.state.fname} onChange={(event) => this.setState({fname:event.target.value})} placeholder="Enter Full name" required/>
          </div>

          <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" className="form-control" value={this.state.email} onChange={(event) => this.setState({email:event.target.value})} placeholder="Enter email" required/>
          </div>

          <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" value={this.state.message} onChange={(event) => this.setState({message:event.target.value})} name="message" rows="5" required/>
          </div>
          <input type="hidden" name="fid" className="form-control" value={this.state.selectedId}/>

          <div className="row">
            <div className="col-md-6">
              <button type="submit" className="btn btn-primary btn-block">Send Feedback</button>
            </div>
            <div className="col-md-6">
              <button type="reset" onClick={() => this.setState({ selectedId: '', fname :'', email :'',message :'' })} className="btn btn-primary btn-block">Reset</button>
            </div>
          </div>

          <table className="mt-3 table table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}