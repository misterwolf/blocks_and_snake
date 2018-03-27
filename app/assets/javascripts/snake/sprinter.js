//= require ./namespace
//= require ./table

//= require ./lib/namespace
//= require ./lib/utility

(function(snake, lib){

  'use strict';

  var SPEED_TO_TIME_LAPSE = {
    0: 250,
    1: 200,
    2: 150,
    3: 100,
    4: 50,
    5: 25
  };

  var Emitter       = lib.Emitter;

  /**
  * The runner of the table. Through a interval it send messages to Table
  * and move all the existing elements.
  *
  * @param {Object} object={} Object containing all the opts
  * speed: it defines the speed of movement of the Table
  * @returns null
  * @function
  * @memberof snake
  */
  var Sprinter = function(opts){

    opts       = opts || {};
    this.table = snake.Table;

    this.speed            = opts.speed || 0;
    this.intervalTime     = SPEED_TO_TIME_LAPSE[this.speed];

    this.intervalObserver = null;

    Emitter.make(this);

  };

  Sprinter.prototype.afterGoOn = function(){

  };

  Sprinter.prototype.increaseSpeed = function(){
    this.speed++;
    this.intervalTime = SPEED_TO_TIME_LAPSE[this.speed];
  };

  Sprinter.prototype.stop = function(){
    clearInterval(this.intervalObserver);
  };

  Sprinter.prototype.start = function(){
    var _this = this;
    _this.intervalObserver = setInterval(function(){
      _this.emit('go-on', _this.afterGoOn);
    }, _this.intervalTime);
  };

  Sprinter.prototype.speedUp = function(){
    this.stop();
    this.increaseSpeed();
    this.start();
  };

  snake.Sprinter = Sprinter;

})(window.snake, window.snake.lib);
