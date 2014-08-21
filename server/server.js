Meteor.startup(function () {
    if (Products.find().count() === 0) {
      var names = ["Air Intake Filters",
                   "Air Pads",
                   "Air Horns"];
      for (var i = 0; i < names.length; i++)
        Products.insert({name: names[i], upVotes: 0, downVotes: 0, percentApproval: 100});
    }
});

Meteor.publish('products',function(){
  return Products.find();
});

Meteor.publish('uservotes',function(){
  return UserVotes.find();
});

Meteor.methods({
  insertProduct: function(name){
    var newProduct = {
      name: name,
      upVotes: 0,
      downVotes: 0,
      percentApproval: 50
    }
    Products.insert(newProduct);
  }
});


 



