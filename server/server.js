Meteor.startup(function () {
    if (Products.find().count() === 0) {
      var names = ["Air Intake Filters",
                   "Air Pads",
                   "Air Horns"];
      for (var i = 0; i < names.length; i++)
        Products.insert({name: names[i]});
    }
  });
  Meteor.publish('products',function(){
    return Products.find();
  });
