define(function(require, exports, module) {
  //All the required classes used in this file

  var Engine = require('famous/core/Engine');
  var RenderController = require('famous/views/RenderController');
  var Modifier = require('famous/core/Modifier');

  var LoginView = require('./login');
  var HomeView = require('./home');
  var UserView = new require('./loved-one');
  var Caregiver = require('./caregiver-view');
  var MenuHandler = require('./menu-handler');
  var Calendar = require('./calendar');

  var App = function() {

  	var self = this;

  	this.mainContext = Engine.createContext();

  	var rcModifier = new Modifier({
  		origin: [0.5, 0.5]
  	});

  	this.mh = new MenuHandler();

  	this.renderController = new RenderController();

  	this.calendar = new Calendar(this.renderController);

  	this.mainContext.add(this.mh.getView())

  	this.mainContext.add(rcModifier).add(this.renderController);

  	// this.mh.getView().on('Calendar', function() {
  	// 	self.renderController.show(self.calendar.getView());
  	// });

  	this._initApp();

  }

  App.prototype._initApp = function() {
  	var self = this;

  	var loginView = new LoginView();

  	var userView = new UserView();

  	var homeScreen = new HomeView();



  	this.renderController.show(loginView.getView());

  	loginView.getView().on('login', function() {
  		self.mainContext.add(self.mh.getButton());
  		self.renderController.show(self.calendar.getView());
  	})



  }

  module.exports = App;

});