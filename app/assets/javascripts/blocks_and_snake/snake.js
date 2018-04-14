//= require ./namespace
//= require ./table-slice

//= require ./lib/namespace
//= require ./lib/utility

(function(blocks_and_snake, lib){

  'use strict';

  var POSITION_Y = 400;
  var POSITION_X = 200;
  var MARGIN_POSITION_X_FOR_VALUE = 20;
  var MARGIN_POSITION_Y_FOR_VALUE = 2.5;

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
    this.canvas          = opts.canvas        || {};

    this.value           = opts.value         || 5;
    this.radius          = opts.radius        || 10;
    this.outline         = opts.outline       || 2 * Math.PI;
    this.positionX       = opts.positionX     || POSITION_X;
    this.positionY       = opts.positionY     || POSITION_Y;

    this.bgColor         = opts.bgColor       || '#ffffff';
    this.textColor       = opts.textColor     || '#ffffff';

    this.lowerXLimit     = opts.lowerXLimit   || 0;
    this.greaterXLimit   = opts.greaterXLimit || 600;

    this.marginXValue    = this.marginXValue  || MARGIN_POSITION_X_FOR_VALUE;
    this.marginYValue    = this.marginYValue  || MARGIN_POSITION_Y_FOR_VALUE;

    Emitter.make(this);
  };

  Snake.prototype.decrementValue = function(){
    this.value--;
    if (!this.value){
      this.emit('snake-null');
    }
  };

  Snake.prototype.incrementValue = function(value){
    this.value = (value || 1) + this.value;
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

  Snake.prototype.render = function(){
    var rendering = 0;

    while ( rendering < this.value){

      this.canvas.renderSnake({
        positionX : this.positionX,
        positionY : this.positionY + (rendering * this.radius),
        radius    : this.radius,
        bgColor   : this.bgColor,
        outline   : this.outline
      });
      rendering++;

    }

    this.canvas.renderSnakeValue({
      value     : this.value,
      color     : this.textColor,
      positionX : this.positionX + this.marginXValue,
      positionY : this.positionY + this.marginYValue
    });
  };

  blocks_and_snake.Snake = Snake;

})(window._blocks_and_snake, window._blocks_and_snake.lib);
