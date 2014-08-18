Template.nav.events({
  'click #navAbout': function(){
    Session.set('app','about');
    console.log(Session.get('app'));
  },
  'click #navHome': function(){
    Session.set('app','home');
      console.log(Session.get('app'));
  }
});