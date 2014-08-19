var productArray = ["Airlocks","Bags","Cages","Clamps","Ducts","Firedoor"]
var currChoice = "initializing";

Meteor.startup(function () {
    if (Products.find().count() === 0) {
      var names = ["Air Intake Filters",
                   "Air Pads",
                   "Air Horns"];
      for (var i = 0; i < names.length; i++)
        Products.insert({name: names[i], upVotes: 0, downVotes: 0, percentApproval: 100});
    }
  if (Balls.find().count() === 0) {
      var names = ["Air Intake Filters",
                   "Air Pads",
                   "Air Horns"];
      for (var i = 0; i < names.length; i++)
        Balls.insert({name: names[i]});
    }
});

Meteor.publish('products',function(){
  return Products.find();
});

Meteor.publish('balls',function(){
    return Balls.find();
});

Meteor.publish('uservotes',function(){
  return UserVotes.find();
});

Meteor.methods({
  randomProduct: function(){
    return currChoice;
  }
});

setInterval(function pickRando(){
  var newChoice = Random.choice(productArray);
  if(newChoice === currChoice){
    pickRando();
  }
  else{
    currChoice = newChoice;
  }
},6000);
 



