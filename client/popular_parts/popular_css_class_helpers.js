Template.popular_parts.popSortClass = function(){
  if ((Session.get('popularPartsSort') == 'popularity') || (Session.get('popularPartsSort') == 'popularityReverse'))
    return "btn-success";
  else
    return ""; 
}

Template.popular_parts.alphSortClass = function(){
  if ((Session.get('popularPartsSort') == 'alphabetical') || (Session.get('popularPartsSort') == 'alphabeticalReverse'))
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