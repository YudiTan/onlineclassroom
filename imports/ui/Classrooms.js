import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import ClassForm from './ClassForm';
import ClassList from './ClassList';

export default class Classrooms extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <div className="header__content">
            <h1 className="header__title"> Classrooms homepage </h1>
            <button className='button button--link-text' onClick={() => Accounts.logout()}>Logout</button>
          </div>
        </div>

        <div className="page-content">
          <ClassForm/>
          <ClassList/>
        </div>
        
      </div>
    )
  }
}
