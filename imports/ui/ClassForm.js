import React from 'react';
import {Meteor} from 'meteor/meteor';
import Modal from 'react-modal';

export default class ClassForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      isOpen: false,
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let classname = this.refs.classname.value.trim();
    let url = this.refs.url.value.trim();

    Meteor.call('classes.insert', classname, url, (err, res) => {
      if (!err){
        this.handleModalClose();
      } else {
        this.setState({error:err.reason})
      }
    })
  };

handleModalClose() {
    this.setState({isOpen: false, error: ''})
};


  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Class</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Class"
          onAfterOpen={() => this.refs.classname.focus()} //this allows automatic cursor to be on the input
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">

          <h1>Add Class</h1>
          {this.state.error ? <p>{this.state.error}</p> : null}

        <form className='boxed-view__form' onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="classname" placeholder="Class name"/>
          <input type="text" ref="url" placeholder="Class Url" />
          <button className="button">Add Class</button>
          <button type="button" className='button button--secondary' onClick={this.handleModalClose.bind(this)}> Close </button>
        </form>
      </Modal>
      </div>
    )
  }
}
