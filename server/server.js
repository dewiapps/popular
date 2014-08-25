Meteor.startup(function () {
    if (Products.find().count() === 0) {
      var names = ["Air Intake Filters",
                   "Air Pads",
                   "Air Horns"];
      for (var i = 0; i < names.length; i++)
        Products.insert({name: names[i], upVotes: 0, downVotes: 0, percentApproval: 100});
    }
});

Meteor.publish('products',function(){
  return Products.find();
});

Meteor.publish('uservotes',function(){
  return UserVotes.find();
});

Meteor.publish('emails',function(){
    return Emails.find();
});

Meteor.methods({
  insertProduct: function(name){
    var newProduct = {
      name: name,
      upVotes: 0,
      downVotes: 0,
      percentApproval: 50
    }
    Products.insert(newProduct);
  },
  removeProduct: function(prodId){
    Products.remove({_id: prodId});
  },
  validateEmail: function(email){
    var validEmails = Emails.find().map(function(mail){
      return mail.address;
    }); 
    var isValidEmail = (validEmails.indexOf(email) > -1)
    return isValidEmail;
  },
  insertNewEmail: function(email){
    Emails.insert({ address: email});
  },
  removeEmail: function(emailId){
    Emails.remove({ _id: emailId});
  }
});

Accounts.onCreateUser(function(options, user) {
  var isValid = Meteor.call('validateEmail', user.emails[0].address);
  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;
  console.log(isValid);
  if(isValid)
    return user;
  else
    throw new Meteor.Error(403, "Your email address has not been added to the list.  Please contact Nate Dean");
});


 



