Template.about.balls = function(){
  return Balls.find({user: Meteor.user()});
}

Template.about.events({
  'click #addBall': function(){
    Balls.insert({user: Meteor.user()});
  },
    'click .ball': function(){
      Balls.remove({_id: this._id});
    }
});

  


  setInterval(function(){
      var containerWidth = $('#ballContainer').width() - 50 //width of ball is 50;
      
      console.log('running about page loop');


    $('.ball').each(function(){
      var rando = Math.floor((Math.random()*5)*10);
      var randoLeft = Math.floor(Math.random()*containerWidth);
      var randColor = Random.hexString(5);
      var randoTime = Math.floor(Math.random()*1000);

      $(this).animate({
        height: rando + 'px',
        width: rando + 'px',
        left: randoLeft,
      },randoTime);
      $(this).css({
        'background-color': '#' + randColor
      });
    }); 
  },1000);
  








