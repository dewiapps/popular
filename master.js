Products = new Meteor.Collection("products");
UserVotes = new Meteor.Collection("uservotes");
Emails = new Meteor.Collection("emails");

Products.allow({
  update: function() { return true; },
});

UserVotes.allow({
  insert: function() { return true; },
  update: function() { return true; },
  remove: function() { return true; }
});

Emails.allow({
  // all done more securely via server methods
});