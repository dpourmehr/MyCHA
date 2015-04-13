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
  var Easing = require('famous/transitions/Easing');

  

  var MenuHandler = function() {

  	this.mainTransition = {
  		method: SpringTransition,
  		period: 400,
  		dampingRatio: .7
  	}

  	// this.mainTransition = {
  	// 	duration: 400,
  	// 	curve: Easing.easeOut
  	// }

  	var self = this;

  	this.activated = false;

  	this.menuTT = new TransitionableTransform();

  	this.menuModifier = new Modifier({
  		transform: this.menuTT,
  		origin: [0, 0]
  	});

  	this.menuTT.set(Transform.translate(-document.body.clientWidth * .8 - 30, 50, 4));

  	this.mainView = new View();

  	var background = new Surface({
  		size: [document.body.clientHeight - 50, document.body.clientWidth * .8],
  		content: '<img src="content/images/MenuBackground.png" width="' + (document.body.clientWidth * .8) + 'px" height="' + (document.body.clientHeight - 50) + 'px">'
  	});

  	this.backgroundTT = new TransitionableTransform();

  	this.menuBackgroundMod = new Modifier({
  		transform: this.backgroundTT,
  		origin: [0, 0]
  	});

  	this.backgroundTT.set(Transform.translate(-document.body.clientWidth * .8, 50, 0));

  	this.backgroundView = new View();
  	this.backgroundView.add(this.menuBackgroundMod).add(background);

  	this.mainView.add(this.backgroundView);

  	this.mainView.add(this.menuModifier).add(this._createMenu());

  }

  MenuHandler.prototype.getButton = function() {
  	var self = this;
  	var menuButton = new Surface({
  		size: [50, 50],
  		content: '<img src="content/images/menu.png">',
  		classes: ['menu-button']
  	});
  	menuButton.on('click', function() {
  		if(!self.activated) {
  			self.menuTT.halt();
  			self.menuTT.set(Transform.translate(0, 50, 4), self.mainTransition);
  			self.backgroundTT.halt();
  			self.backgroundTT.set(Transform.translate(0, 50, 0), self.mainTransition);
  			self.activated = true;
  		} else {
  			self.menuTT.halt();
  			self.menuTT.set(Transform.translate(-document.body.clientWidth * .8 - 30, 50, 4), self.mainTransition);
  			self.backgroundTT.halt();
  			self.backgroundTT.set(Transform.translate(-document.body.clientWidth * .8 - 30, 50, 0), self.mainTransition);
  			self.activated = false;
  		}
  	});

  	return menuButton;
  }

  MenuHandler.prototype.getView = function() {
  	return this.mainView;
  }

  MenuHandler.prototype.getLayout = function(icon, content) {
  	var self = this;

  	var itemWidth = document.body.clientWidth * .8;
  	
  	var menuItemLayout = new SequentialLayout({direction: 0});
  	var items = [];

  	menuItemLayout.sequenceFrom(items);

  	var icon = new Surface({
  		size: [50, 50],
  		content: '<img src="' + icon + '" width="32px" height="32px">',
  		classes: ['menu-item-icon']
  	});

  	items.push(icon);

  	var menuItem = new Surface({
  		size: [itemWidth - 50, 50],
  		content: content,
  		classes: ['menu-item']
  	});

  	menuItem.on('click', function() {
  		self.mainView._eventOutput.emit(menuItem.getContent());
  	});

  	menuItem.on('mouseenter', function() {
  		menuItem.setProperties({
  			backgroundColor: '#f05a4f',
  			cursor: 'pointer'
  		});
  	});

  	menuItem.on('mouseleave', function() {
  		menuItem.setProperties({
  			backgroundColor: '#bf443b',
  			cursor: 'initial'
  		});
  	});

  	items.push(menuItem);

  	return menuItemLayout;

  }

  MenuHandler.prototype._createMenu = function() {
  	var self = this;

  	var menuLayout = new SequentialLayout({direction: 1});
  	var menuItems = [];

  	var itemWidth = document.body.clientWidth * .8;

  	menuLayout.sequenceFrom(menuItems);

  	var patient = this.getLayout('content/images/patient.png', 'Patient');
  	var calendar = this.getLayout('content/images/calendar.png', 'Calendar');
  	var medication = this.getLayout('content/images/medication.png', 'Medication');
  	var notes = this.getLayout('content/images/notes.png', 'Notes');
  	var settings = this.getLayout('content/images/settings.png', 'Settings');

  	var topItemLayout = new SequentialLayout({direction: 0});
  	var topItems = [];

  	topItemLayout.sequenceFrom(topItems);

  	var topIconSurface = new Surface({
  		size: [60, 60],
  		content: '<img style="background-color: #bf443b;text-align: center;" src="content/images/profilePic.png">',
  		classes: ['profile-icon']
  	});

  	topItems.push(topIconSurface);

  	var careGiver = new Surface({
  		size: [(document.body.clientWidth* .8) - 120, 60],
  		content: 'Darien Pourmehr',
  		classes: ['menu-header']
  	});

  	topItems.push(careGiver);

  	var closeMenu = new Surface({
  		size: [60, 60],
  		content: '<img src="content/images/chevron4.png" height="30px" width = "30px">',
  		classes: ['close-menu']
  	});

  	closeMenu.on('click', function() {
  		if(self.activated) {
	  		self.menuTT.halt();
	  		self.menuTT.set(Transform.translate(-document.body.clientWidth * .8 - 30, 50, 4), self.mainTransition);
	  		self.backgroundTT.halt();
	  		self.backgroundTT.set(Transform.translate(-document.body.clientWidth * .8 - 30, 50, 0), self.mainTransition);
	  		self.activated = false;
	  	} else {
	  		self.menuTT.halt();
	  		self.menuTT.set(Transform.translate(0, 50, 4), self.mainTransition);
	  		self.backgroundTT.halt();
  			self.backgroundTT.set(Transform.translate(0, 50, 0), self.mainTransition);
	  		self.activated = true;
	  	}
  	})

  	topItems.push(closeMenu);


  	menuItems.push(topItemLayout);
  	menuItems.push(patient);
  	menuItems.push(calendar);
  	menuItems.push(medication);
  	menuItems.push(notes);
  	menuItems.push(settings);

  	return menuLayout;

  }

  module.exports = MenuHandler;

});