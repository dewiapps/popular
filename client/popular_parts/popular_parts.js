Template.popular_parts.products = function(){
  return Products.find({}, {sort: {percentApproval: -1}});
 }

Template.popular_parts.votes = function(tmpl){
  var totalVotes = this.upVotes + this.downVotes;

  if (totalVotes === 0){
    return this.percentApproval + '%';
  }
  else{
    var percentage = Math.round((this.upVotes/totalVotes) * 100);
    Products.update(this._id, {$set: {percentApproval: percentage}});
    return percentage + '%';
  }
    
}

Template.popular_parts.events({
  'click .voteUp': function(){
    Products.update(this._id, {$inc: {upVotes: 1}});
  },
  'click .voteDown':function(){
    Products.update(this._id, {$inc: {downVotes: 1}});
  }
});