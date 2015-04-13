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

  var Caregiver = function() {
  	var self = this;

  	this.mainView = new View();

  	this._initApp();

  }

  Caregiver.prototype.getView = function() {
  	return this.mainView;
  }

  Caregiver.prototype._initApp = function() {

  	

  }

  module.exports = Caregiver;

});