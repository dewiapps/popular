Template.emails.isAdmin = function(){
  if(Meteor.user())
    return Meteor.user().emails[0].address == "natedeanmail@gmail.com";
}

Template.emails.allowedEmails = function(){
  return Emails.find();
}

Template.emails.events({
  'click .emailAddress' : function(evt, tmpl){
    Meteor.call('removeEmail', this._id);
  },
  'keyup #exampleInputEmail1' : function(evt, tmpl){
    if (evt.which === 13){
      if (evt.target.value.length < 4){
        $('#inputMessage').text('email address must be longer than 4 characters');
        return;
      }
      Meteor.call('insertNewEmail', evt.target.value);
      evt.target.value = "";
    }     
  }
  
});