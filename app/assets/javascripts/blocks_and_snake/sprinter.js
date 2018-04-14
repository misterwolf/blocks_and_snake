/* global  requestAnimationFrame */

//= require ./namespace
//= require ./table

//= require ./lib/namespace
//= require ./lib/utility

(function(blocks_and_snake, lib){

  'use strict';

  var Emitter    = lib.Emitter;

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

    opts                  = opts || {};
    this.clearRect        = opts.clearRect || function(){};
    this.table            = opts.table || {};
    this.speed            = opts.speed || 1;

    this.intervalObserver = null;

    Emitter.make(this);

  };

  Sprinter.prototype.increaseSpeed = function(){
    this.speed++;
  };

  Sprinter.prototype.decreaseSpeed = function(){
    this.speed--;
  };

  Sprinter.prototype.stop = function(){
    window.cancelAnimationFrame(this.intervalObserver);
  };

  Sprinter.prototype.start = function(){
    var _this = this;

    _this.clearRect();
    var loopFunct = function(){
      _this.table.emit('go-on', _this.speed);
      _this.clearRect();
      _this.intervalObserver = requestAnimationFrame(loopFunct);
    };

    this.intervalObserver = requestAnimationFrame(loopFunct);
  };

  Sprinter.prototype.speedUp = function(){
    this.increaseSpeed();
  };

  Sprinter.prototype.speedDown = function(){
    this.decreaseSpeed();
  };

  blocks_and_snake.Sprinter = Sprinter;

})(window._blocks_and_snake, window._blocks_and_snake.lib);
