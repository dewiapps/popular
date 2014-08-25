Template.nav.isNate = function(){
  
  if(Meteor.user()){
    if (Meteor.user().emails[0].address == "natedeanmail@gmail.com")
      return true;
  }
}

