Meteor.subscribe('products');
Meteor.subscribe('balls');

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Session.setDefault('app','home');
