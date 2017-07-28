import React from 'react';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor';


export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let username = this.refs.username.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({username}, password, (err) => {
      if (err) {
        this.setState({error: 'Unable to login. Check username and password.'});
      } else {
        this.setState({error: ''});
      }
    });
  };


  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
        <h1> Online Classroom </h1>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit.bind(this)} noValidate className='boxed-view__form'>
          <input type="text" ref="username" name="username" placeholder="Username"/>
          <input type="password" ref="password" name="password" placeholder="Password" />
          <button>Login</button>
        </form>
        <Link to='/signup'>Don't have an account?</Link>
      </div>
      </div>
    )
  }
};
