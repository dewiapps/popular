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
    },
    'keyup #newProductInput': function(e){
      if(e.which === 13){
        var newProduct = $('#newProductInput').val();
        check(newProduct, String);
        if(newProduct !== "") Products.insert({name: newProduct});
        $('#newProductInput').val("");
      }
    },
    'click .product': function(){
      Products.remove({_id: this._id});
    }
  });

