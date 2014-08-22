Session.setDefault('popularPartsSort','alphabetical');
Session.setDefault('showSort','all');

Template.popular_parts.products = function(){
  var sortParameter = Session.get('popularPartsSort');
  var showParameter = Session.get('showSort');
  var productsThisUserHasVotedFor = UserVotes.find({user: Meteor.user()}).map(function(vote){
    return vote.product;
  });
  
  if(showParameter == 'all'){
    if(sortParameter == 'popularity')
      return Products.find({}, {sort: {percentApproval: -1}});
    if(sortParameter == 'popularityReverse')
      return Products.find({}, {sort: {percentApproval: 1}});
    if(sortParameter == 'alphabetical')
      return Products.find({}, {sort: {name: 1}});
    if(sortParameter == 'alphabeticalReverse')
      return Products.find({}, {sort: {name: -1}});
  }
  if(showParameter == 'voted'){ 
    if(sortParameter == 'popularity')
      return Products.find({_id: {$in: productsThisUserHasVotedFor}}, {sort: {percentApproval: -1}});
    if(sortParameter == 'popularityReverse')
      return Products.find({_id: {$in: productsThisUserHasVotedFor}}, {sort: {percentApproval: 1}});
    if(sortParameter == 'alphabetical')
      return Products.find({_id: {$in: productsThisUserHasVotedFor}}, {sort: {name: 1}});
    if(sortParameter == 'alphabeticalReverse')
      return Products.find({_id: {$in: productsThisUserHasVotedFor}}, {sort: {name: -1}});
  }
  if(showParameter == 'notVoted'){  
    if(sortParameter == 'popularity')
      return Products.find({_id: {$nin: productsThisUserHasVotedFor}}, {sort: {percentApproval: -1}});
    if(sortParameter == 'popularityReverse')
      return Products.find({_id: {$nin: productsThisUserHasVotedFor}}, {sort: {percentApproval: 1}});
    if(sortParameter == 'alphabetical')
      return Products.find({_id: {$nin: productsThisUserHasVotedFor}}, {sort: {name: 1}});
    if(sortParameter == 'alphabeticalReverse')
      return Products.find({_id: {$nin: productsThisUserHasVotedFor}}, {sort: {name: -1}});
  }
 } // end products helper

Template.popular_parts.likedItems = function(){
  var productsThisUserHasVotedFor = UserVotes.find({user: Meteor.user()}).map(function(vote){
    return vote.product;
  });
  
  if (productsThisUserHasVotedFor.length > 0){
    return Products.find({_id: {$nin: productsThisUserHasVotedFor}});
  }
  
  //return UserVotes.find({user: Meteor.user()},{sort: {_id: 1}});
}

Template.popular_parts.availableProducts = function(){  
  return Products.find({});
}


Template.popular_parts.currentUserOnList = function(){
  if(Meteor.user() === null)
    return false;
  
  var emailList = ['natedeanmail@gmail.com','ndean@iac-intl.com','mattman@matt.com'];
  
  if ( emailList.indexOf(Meteor.user().emails[0].address) > -1 )
    return true;
  else
    return false;
}



Template.popular_parts.votePercentage = function(tmpl){
  var totalVotes = this.upVotes + this.downVotes;
  var neededVotes = 3;

  if (totalVotes < neededVotes){
    var votes = neededVotes - totalVotes;
    return "Needs " + votes + " more votes to calculate";
  }
  else{
    var percentage = Math.round((this.upVotes/totalVotes) * 100);
    if (percentage < 0) percentage = 0;
    Products.update(this._id, {$set: {percentApproval: percentage}});
    return percentage + '% approval';
  }
    
}

Template.popular_parts.numberVotes = function(){
  return this.upVotes + this.downVotes;
}




