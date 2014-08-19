Template.popular_parts.products = function(){
  return Products.find({}, {sort: {percentApproval: -1}});
 }

Template.popular_parts.btnSuccessClass = function(){
  var userLike = UserVotes.findOne({$and: [
    {product: this._id},
    {user: Meteor.user()}
  ]});
  
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
        console.log('nothing happens.  you have already liked this product');
      }
      else{
        Products.update(this._id, {$inc: {upVotes: 1, downVotes: -1}});
        UserVotes.update(userLike._id, {$set: {like: true}});
      }
        
    }  
  },
  'click .voteDown':function(){
    var hasBeenVotedOn = ( UserVotes.find({user: Meteor.user(), product: this._id}).count() ) ? true : false;
    
    if(!hasBeenVotedOn){
      Products.update(this._id, {$inc: {downVotes: 1}});
      UserVotes.insert({user: Meteor.user(), product: this._id, like: false});
    }else{
      var userLike = UserVotes.findOne({$and: [
        {product: this._id},
        {user: Meteor.user()}
      ]});

      if (userLike.like === false){
        console.log('nothing happens.  you have already disliked this product');
      }
      else{
        Products.update(this._id, {$inc: {downVotes: 1, upVotes: -1}});
        UserVotes.update(userLike._id, {$set: {like: false}});
      }
    }
  }
});  // events