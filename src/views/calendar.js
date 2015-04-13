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

  

  var Calendar = function(controller) {

    var self = this;

    this.views = [];
    this.days = [];
    this.smallDays = [];
    this.modifiers = [];

    this.activated = false;

    this.permLayout = new SequentialLayout({direction: 1});

    this.calTT = new TransitionableTransform();

    this.mainView = new View();

    this.controller = controller;

    this._createCalendar();

  }

  Calendar.prototype._createCalendar = function() {
    var self = this;

    var currentMonthDays = new Date(2014, 11, 0).getDate();

    var weeks = [];

    for(var i = 0; i < currentMonthDays; i++) {

      var day = new Surface({
        size: [(document.body.clientWidth/7), (document.body.clientHeight/5) - 12],
        content: 'Nov ' + (Number(i) + 1),
        classes: ['day-surface-v2']
      });

      var modifier = new Modifier({
        origin: [0, 0.5]
      });

      var dayView = new View();
      dayView.add(modifier).add(day);

      this.views.push(dayView);
      this.modifiers.push(modifier);
      
      var day2 = new Surface({
        size: [(document.body.clientWidth/7), (document.body.clientHeight/5)],
        content: 'Nov ' + (Number(i) +1),
        classes: ['day-surface']
      });


      this.days.push(day);

      this.smallDays.push(day);
    }

    var count = 0;

    for(var i = 0; i < 5; i++) {
      var weekLayout = new SequentialLayout({direction: 0});
      var daysOfWeek = [];
      weekLayout.sequenceFrom(daysOfWeek);
      for(var j = 0; j < 7; j++) {
        //console.log(j);
        daysOfWeek.push(this.smallDays[count]);
        if(j == 6) {
          weeks.push(weekLayout);
        }
        if((Number(count) + 1) == currentMonthDays) {
          weeks.push(weekLayout);
          break;
        }
        count++;
      }
      if((Number(count) + 1) == currentMonthDays) {
        break;
      }
    }

    var calendarLayout = new SequentialLayout({direction: 1});
    calendarLayout.sequenceFrom(weeks);

    this.calTT.setTranslate([0, -10, -10]);

    this.mainView.add(new Modifier({
      transform: this.calTT
    })).add(calendarLayout);

    var headerSurface = new Surface({
      size: [document.body.clientWidth - 50, 50],
      content: 'Calendar',
      classes: ['header-item']
    });

    this.mainView.add(new Modifier({
      origin: [0, 0],
      transform: Transform.translate(50, 0, 10)
    })).add(headerSurface);

    this.permLayout = calendarLayout;

    this._addClickListeners();
  }

  Calendar.prototype.getView = function() {
    return this.mainView;
  }

  Calendar.prototype._addClickListeners = function() {
    var self = this;
    for(var i = 0; i < this.days.length; i++) {
      this.days[i].on('click', function() {
        var self2 = self;

        this.setProperties({
          lineHeight: '300px',
          fontSize: '25pt'
        });

        if(self.activated == false) {
          this.setSize([document.body.clientWidth, document.body.clientHeight - 75]);
          self.controller.show(new View().add(new Modifier({transform: Transform.translate(0, 0, 0)})).add(this));
          self.calTT.halt();
          self.calTT.setTranslate([-document.body.clientWidth, 0, 0], {duration: 500});
           self.activated = true;
        } else {

          this.setProperties({
            lineHeight: '20%',
            fontSize: '8pt'
          });

          self.calTT.halt();
          self.calTT.setTranslate([0, -10, -10], {duration: 500});
          this.setSize([document.body.clientWidth/7, (document.body.clientHeight/5) - 12]);
          self.controller.show(self.mainView);
          self.activated = false;
        }
      });
    }
  }

  Calendar.prototype.resetPositions = function() {
    var self = this;
    for(var i = 0; i < this.days.length; i++) {
        this.modifiers[this.getContent().replace("Nov ", "") - 1].setSize([document.body.clientWidth, document.body.clientHeight], {duration: 500});
        this.controller.show(self.views[this.getContent().replace("Nov ", "") - 1]);
        this.modifiers[this.getContent().replace("Nov ", "") - 1].setTransform(Transform.translate(0, 50, 0), {duration: 500});
        this.setSize(document.body.clientWidth, document.body.clientHeight-75);
    }

  }

  Calendar.prototype._createMenu = function() {


  }

  module.exports = Calendar;

});