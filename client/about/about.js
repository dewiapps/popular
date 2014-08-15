Template.about.balls = function(){
  return Balls.find();
}

Template.about.events({
  'click #addBall': function(){
    Balls.insert({name: "whatever"});
  },
    'click .ball': function(){
      Balls.remove({_id: this._id});
    }
});