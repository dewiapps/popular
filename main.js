Products = new Meteor.Collection("products");
Balls = new Meteor.Collection("balls");
UserVotes = new Meteor.Collection("uservotes");

Products.allow({
  insert: function() { return true; },
  update: function() { return true; },
  remove: function() { return true; }
});

Balls.allow({
  insert: function() { return true; },
  update: function() { return true; },
  remove: function() { return true; }
});

UserVotes.allow({
  insert: function() { return true; },
  update: function() { return true; },
  remove: function() { return true; }
});