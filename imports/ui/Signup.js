import React from "react";
import {Accounts} from 'meteor/accounts-base';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor';

export default class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
    }
  }


  onSubmit(e) {
    e.preventDefault();
    let username = this.refs.username.value.trim();
    let password = this.refs.password.value;

    if (password.length < 6) {
      return this.setState({error: 'Password has to be more than 5 characters long.'}) //returning here stops the createUser function below
    }

    Accounts.createUser({username, password}, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ""});
      }
    });

  }


  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
        <h1>Sign up</h1>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
          <input type="text" ref="username" name="username" placeholder="Username"/>
          <input type="password" ref="password" name="password" placeholder="Password" />
          <button>Create Account!</button>
        </form>
        <Link to='/'>Already have an account?</Link>
      </div>
      </div>
    )
  }
};
