var clickCounter = 0;

  Template.home.greeting = function () {
    return "Welcome to template.";
  };

 Template.home.products = function(){
  return Products.find();
 }

  Template.home.events({
    'click input#test': function () {
      // template data, if any, is available in 'this'
    clickCounter++;  
    var p = $('#greeting'); 
     if(clickCounter === 1){
       p.html('Hello!');
     }else{
       p.html('You have pushed the green button ' + clickCounter + ' times.<br>  Are you bored yet?');    
     }
    
    },
    'click #addNewProduct': function(){
      var newProduct = $('#newProductInput').val();
      check(newProduct, String);
      if(newProduct !== "") Products.insert({name: newProduct});
      $('#newProductInput').val("");
      $('#newProductInput').focus();
    },
    'keyup #newProductInput': function(e){
      if(e.which === 13){
        var productInput = $('#newProductInput')
        var newProduct = productInput.val();
        check(newProduct, String);
        if(newProduct !== "") Products.insert({name: newProduct, votes: 0});
        $('#newProductInput').val("");
      }
    },
    'click .product': function(){
      Products.remove({_id: this._id});
    },
    'click .lightbox': function(){
      var toggled = $( '#lightbox' ).hasClass('current');
      var lightbox = document.getElementById('lightbox');
      if (!toggled)
        lightbox.className = lightbox.className + " current";
      else
        lightbox.className = "lightbox";
    }
  });// end events helpers

setInterval(function(){
  Meteor.call('randomProduct', function(err, data){
    if (err)
      console.log(err);
    else
      $('#randomProduct').html(data);
  });
},5000);




