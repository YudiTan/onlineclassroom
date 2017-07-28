import { Mongo } from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const Classes = new Mongo.Collection('classes');


if (Meteor.isServer) {
  Meteor.publish('classes', function (){ //has to use this instead of arrowfunction because we need the "this" method
    let userId = this.userId //when decided to use pub-sub, run meteor list and remove the 2 (prototyping) packages so that we can control the user's interaction with db
    return Classes.find({userId});
  })
}

Meteor.methods({
  'classes.insert'(classname, url) {
    if (!this.userId) {
    throw new Meteor.Error('not-authorized');
  }

  Classes.insert({
    url,
    userId: this.userId,
    classname: classname,
  })
},

  'classes.delete'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Classes.remove({_id})
  }
});
