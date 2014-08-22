Template.popular_parts.events({
  'click #popSort': function(){
    if(Session.get('popularPartsSort') == 'popularity')
      Session.set('popularPartsSort','popularityReverse');
    else
      Session.set('popularPartsSort','popularity');
  },
  'click #alphSort': function(){
    if(Session.get('popularPartsSort') == 'alphabetical')
      Session.set('popularPartsSort','alphabeticalReverse');
    else
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