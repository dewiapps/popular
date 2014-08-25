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
      if(newProduct !== "") Meteor.call('insertProduct',newProduct);
      $('#newProductInput').val("");
      $('#newProductInput').focus();
    },
    'keyup #newProductInput': function(e){
      if(e.which === 13){
        var productInput = $('#newProductInput')
        var newProduct = productInput.val();
        check(newProduct, String);
        if(newProduct !== "") Meteor.call('insertProduct',newProduct);
        $('#newProductInput').val("");
      }
    },
    'click .product': function(){
      Meteor.call('removeProduct', this._id);
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






