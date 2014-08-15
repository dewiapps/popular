Router.configure({
  layoutTemplate:'layout'
});
Router.map(function(){
  this.route('home',{path:'/'});
  this.route('about',{path:'/about/'});
  this.route('other-stuff',{path:'/other-stuff/'});
});