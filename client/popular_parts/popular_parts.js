Session.setDefault('popularPartsSort','popularity');
Session.setDefault('showSort','all');

Template.popular_parts.products = function(){
  var sortParameter = Session.get('popularPartsSort');
  var showParameter = Session.get('showSort');
  
  if(showParameter == 'all'){
    if(sortParameter == 'popularity')
      return Products.find({}, {sort: {percentApproval: -1}});
    if(sortParameter == 'alphabetical')
      return Products.find({}, {sort: {name: 1}});
  }
  if(showParameter == 'voted'){ 
    if(sortParameter == 'popularity')
      return Products.find({}, {sort: {percentApproval: -1}});
    if(sortParameter == 'alphabetical')
      return Products.find({}, {sort: {name: 1}});
  }
  if(showParameter == 'notVoted'){  
    if(sortParameter == 'popularity')
      return Products.find({}, {sort: {percentApproval: -1}});
    if(sortParameter == 'alphabetical')
      return Products.find({}, {sort: {name: 1}});
  }
 } // end products helper

Template.popular_parts.likedItems = function(){
  return UserVotes.find({user: Meteor.user()});
}

Template.popular_parts.popSortClass = function(){
  if (Session.get('popularPartsSort') == 'popularity')
    return "btn-success";
  else
    return ""; 
}

Template.popular_parts.alphSortClass = function(){
  if (Session.get('popularPartsSort') == 'alphabetical')
    return "btn-success";
  else
    return ""; 
}

Template.popular_parts.allSortClass = function(){
  if (Session.get('showSort') == 'all')
      return "btn-success";
  else
      return "";
}

Template.popular_parts.votedSortClass = function(){
  if (Session.get('showSort') == 'voted')
      return "btn-success";
  else
      return "";
}

Template.popular_parts.notVotedSortClass = function(){
  if (Session.get('showSort') == 'notVoted')
      return "btn-success";
  else
      return "";
}

Template.popular_parts.btnSuccessClass = function(){
  var userLike = UserVotes.findOne({$and: [
    {product: this._id},
    {user: Meteor.user()}
  ]});
  
  if(!userLike)
    return "";
  
  if (userLike.like === true)
    return "btn-success";
  else
    return "";  
}

Template.popular_parts.btnDangerClass = function(){
  var userLike = UserVotes.findOne({$and: [
    {product: this._id},
    {user: Meteor.user()}
  ]});
  
  if(!userLike)
    return "";
  
  if (userLike.like === false)
    return "btn-danger";
  else
    return "";  
}

Template.popular_parts.votes = function(tmpl){
  var totalVotes = this.upVotes + this.downVotes;

  if (totalVotes === 0){
    return this.percentApproval + '%';
  }
  else{
    var percentage = Math.round((this.upVotes/totalVotes) * 100);
    if (percentage < 0) percentage = 0;
    Products.update(this._id, {$set: {percentApproval: percentage}});
    return percentage + '%';
  }
    
}

Template.popular_parts.events({
  'click #popSort': function(){
    Session.set('popularPartsSort','popularity');
  },
  'click #alphSort': function(){
    Session.set('popularPartsSort','alphabetical');
  },
  'click #allSort': function(){
    Session.set('showSort','all');
  },
  'click #votedSort': function(){
    Session.set('showSort','voted');
    console.log('this feature is not working right now due to ... uhh... dumbness.');
  },
  'click #notVotedSort': function(){
    Session.set('showSort','notVoted');
    console.log('this feature is not working right now due to ... uhh... dumbness.');
  },
  'click .voteUp': function(evt,tmpl){
    var hasBeenVotedOn = ( UserVotes.find({user: Meteor.user(), product: this._id}).count() ) ? true : false; 
    
    if(!hasBeenVotedOn){
        Products.update(this._id, {$inc: {upVotes: 1}});
        UserVotes.insert({user: Meteor.user(), product: this._id, like: true});
    }else{
      var userLike = UserVotes.findOne({$and: [
        {product: this._id},
        {user: Meteor.user()}
      ]});

      if (userLike.like === true){
        UserVotes.remove({_id: userLike._id});
        Products.update(this._id, {$inc: {upVotes: -1}});
      }
      else{
        UserVotes.update(userLike._id, {$set: {like: true}});
        Products.update(this._id, {$inc: {upVotes: 1, downVotes: -1}});
      }
      
    }  
  },
  'click .voteDown':function(){
    var hasBeenVotedOn = ( UserVotes.find({user: Meteor.user(), product: this._id}).count() ) ? true : false;
    
    if(!hasBeenVotedOn){
      Products.update(this._id, {$inc: {downVotes: 1}});
      UserVotes.insert({user: Meteor.user(), product: this._id, name: this.name, like: false});
    }else{
      var userLike = UserVotes.findOne({$and: [
        {product: this._id},
        {user: Meteor.user()}
      ]});

      if (userLike.like === false){
        UserVotes.remove({_id: userLike._id});
        Products.update(this._id, {$inc: {downVotes: -1}});
      }
      else{
        UserVotes.update(userLike._id, {$set: {like: false}});
        Products.update(this._id, {$inc: {downVotes: 1, upVotes: -1}});
      }
    }
  }
});  // events