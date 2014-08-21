Meteor.subscribe('products');
Meteor.subscribe('balls');
Meteor.subscribe('uservotes');

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});


