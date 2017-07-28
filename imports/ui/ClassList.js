import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Classes} from '../api/classes';
import { Tracker } from 'meteor/tracker';

export default class ClassList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      classes: [],
    }
  }

  componentDidMount() {
    this.classTracker = Tracker.autorun(() => {
      Meteor.subscribe('classes');
      let classes = Classes.find().fetch();
      this.setState({classes});
    })
  }

  componentWillUnmount(){
    this.classTracker.stop();
  }

  renderClassList() {
    if (this.state.classes.length === 0) {
      return <div className="item"><p className="classlist__status-message"> Please add a class to get started! </p></div>
    } else {
      return this.state.classes.map((c) => {
        return (
          <div className="classlist" key={c._id}>
            <h2 className="classlist__message">{c.classname}</h2>
            <p>{c.url}</p>
            <a href={c.url} className='button button--pill button--link' target='_blank'>Visit</a>
            <button className='button button--pill' onClick={() => Meteor.call('classes.delete', c._id)}>Delete</button>
          </div>
      )
      })
    }
  }

  render() {
    return (
      <div>
        {this.renderClassList()}
      </div>
    )
  }
}
