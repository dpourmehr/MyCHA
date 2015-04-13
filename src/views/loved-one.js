define(function(require, exports, module) {
  //All the required classes used in this file

  var Engine = require('famous/core/Engine');
  var RenderController = require('famous/views/RenderController');
  var Modifier = require('famous/core/Modifier');
  var Surface = require('famous/core/Surface');
  var InputSurface = require('famous/surfaces/InputSurface');
  var View = require('famous/core/View');
  var SequentialLayout = require('famous/views/SequentialLayout');
  var SpringTransition = require('famous/transitions/SpringTransition');
  var Vector = require('famous/math/Vector');
  var Transform = require('famous/core/Transform');
  var TransitionableTransform = require('famous/transitions/TransitionableTransform');


  var UserView = function() {

  	var self = this;

  	this.mainView = new View();

  	this._initLogin();

  }

  UserView.prototype.getView = function() {
  	return this.mainView;
  };

  UserView.prototype._initLogin = function() {

  	var loginLayout = new SequentialLayout({direction: 1, itemSpacing: 40});
  	var mainItems = [];

  	loginLayout.sequenceFrom(mainItems);

  	mainItems.push(this.getUserPass());

  	mainItems.push(this.getButtons());

  	this.mainView.add(loginLayout);

  }

  UserView.prototype.getButtons = function() {
  	var buttonLayout = new SequentialLayout({direction: 1, itemSpacing: 20});
  	var items = [];
  	buttonLayout.sequenceFrom(items);

  	var self = this;
  	var loginButtonView = new View();

  	var loginTT = new TransitionableTransform();

  	var buttonModifier = new Modifier({
  		transform: loginTT
  	});

  	var loginButton = new Surface({
  		size: [document.body.clientWidth - ((document.body.clientWidth/2) - 30), 40],
  		content: 'UserView',
  		classes: ['login-button']
  	});

  	loginButtonView.add(buttonModifier).add(loginButton);

  	loginButton.on('click', function() {
  		loginTT.halt();
  		loginTT.set(Transform.scale(1, 1, 1), {method: SpringTransition, period: 350, dampingratio: .8, velocity: [0.002, .009, 0]});
  		self.mainView._eventOutput.emit('login');
  	});

  	items.push(loginButtonView);

  	var exitButton = new Surface({
  		size: [document.body.clientWidth - ((document.body.clientWidth/2) - 30), 40],
  		content: 'Exit',
  		classes: ['login-button']
  	});

  	var exitTT = new TransitionableTransform();

  	var exitModifier = new Modifier({
  		transform: exitTT
  	});

  	var exitButtonView = new View();

  	exitButtonView.add(exitModifier).add(exitButton);

  	exitButton.on('click', function() {
  		exitTT.halt();
  		exitTT.set(Transform.scale(1, 1, 1), {method: SpringTransition, period: 350, dampingratio: .5, velocity: [0.002, .009, 0]});
  		self.mainView._eventOutput.emit('exit');
  	});

  	items.push(exitButtonView);

  	var buttonView = new View();
  	var layoutModifier = new Modifier({
  		origin: [0.5, 0]
  	});
  	buttonView.add(layoutModifier).add(buttonLayout);

  	return buttonView;
  }

  UserView.prototype.getUserPass = function() {
  	var inputsLayout = new SequentialLayout({direction: 1, itemSpacing: 30});
  	var inputs = [];

  	inputsLayout.sequenceFrom(inputs);

  	inputs.push(this.getField("content/images/headshot.png", 'Username', 'text'));
  	inputs.push(this.getField("content/images/lock.png", 'Password', 'password'));

  	return inputsLayout;
  }

  UserView.prototype.getField = function(icon, placeholder, type) {
  	var fieldLayout = new SequentialLayout({direction: 0, itemSpacing: 0});
  	var items = [];

  	fieldLayout.sequenceFrom(items);

  	var iconSurface = new Surface({
  		size: [50, 50],
  		content: '<img src="' + icon + '">',
  		classes: ['field-icon']
  	});

  	items.push(iconSurface);

  	var textField = new InputSurface({
  		size: [document.body.clientWidth - 70, 50],
  		content: '',
  		classes: ['field-input'],
  		placeholder: placeholder,
  		type: type
  	});

  	items.push(textField);

  	return fieldLayout;

  };

  module.exports = UserView;

});