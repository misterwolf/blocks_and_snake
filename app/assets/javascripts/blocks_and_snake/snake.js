//= require ./namespace
//= require ./table-slice

//= require ./lib/namespace
//= require ./lib/utility

(function(blocks_and_snake, lib){

  'use strict';

  var POSITION_Y = 800;

  var Emitter       = lib.Emitter;

  /**
   * Snake, the main object leaded by User.
   *
   * @param {Object}    object={}  Object containing all the opts
   *    value:     the length of the snake
   *    positionX: the position X on the horizontal line
   *    positionY: the position Y on the horizontal line
   *    bgColor:   the color of the snake
   * @returns null
   * @function
   * @memberof snake
   */
  var Snake = function(opts){

    opts                 = opts               || {};

    this.value           = opts.value         || 0;
    this.positionX       = opts.positionX     || 0;
    this.positionY       = opts.positionY     || POSITION_Y;
    this.bgColor         = opts.bgColor       || '#ffffff';
    this.lowerXLimit     = opts.lowerXLimit   || 0;
    this.greaterXLimit   = opts.greaterXLimit || 600;

    Emitter.make(this);
  };

  Snake.prototype.decrementValue = function(){
    this.value--;
    if (!this.value){
      this.emit('snake-null');
    }
  };

  Snake.prototype.incrementValue = function(){
    this.value++;
  };

  Snake.prototype.moveToTheLeft = function(){
    this.positionX--;
    if (this.positionX < this.lowerXLimit){
      this.positionX = this.lowerXLimit;
    }
  };

  Snake.prototype.moveToTheRight = function(){
    this.positionX++;
    if (this.positionX > this.greaterXLimit){
      this.positionX = this.greaterXLimit;
    }
  };

  blocks_and_snake.Snake = Snake;

})(window._blocks_and_snake, window._blocks_and_snake.lib);
