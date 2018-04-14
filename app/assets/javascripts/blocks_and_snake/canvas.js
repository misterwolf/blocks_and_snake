//= require ./namespace
//= require ./lib/namespace

// read this:
// https://www.sitepoint.com/basic-animation-with-canvas-and-javascript/
// http://codetheory.in/20-best-canvas-tutorials-and-examples-that-will-make-you-a-canvas-master/

(function(blocks_and_snake){

  'use strict';

  var WIDTH        = 600;
  var HEIGHT       = 600;
  var STROKE_STYLE = 'black';
  var LINE_WIDTH   = 2;
  var FONT         = 'sans-serif';
  var FONT_SIZE    = 25;

  var Canvas = function(){
  };

  Canvas.prototype.init = function(opts){
    opts = opts || {};
    this.canvas        = opts.canvas      || document.getElementById('main-canvas');
    this.canvas.width  = opts.width       || WIDTH;
    this.canvas.height = opts.height      || HEIGHT;

    this.lineWidth     = opts.lineWidth   || LINE_WIDTH;
    this.strokeStyle   = opts.strokeStyle || STROKE_STYLE;
    this.fontSize      = opts.fontSize    || FONT_SIZE;

    this.context       = this.canvas.getContext('2d');

  };

  Canvas.prototype.clearRect = function(){
    this.context.clearRect(0, 0, this.width, this.height);
  };

  Canvas.prototype.renderSnakeValue = function(props){
    props = props || {};

    var context = this.context;

    context.beginPath();
    this.styleFont(
      context,
      props.value,
      props.color || '#fff',
      props.positionX,
      props.positionY,
      (FONT_SIZE / 2) + 'pt ' + FONT
    );
  };

  Canvas.prototype.renderSnake = function(props){
    props = props || {};
    var context = this.context;

    context.beginPath();
    context.arc(props.positionX, props.positionY, props.radius, 0, props.outline, true);

    styleBg( context,  props.bgColor || '#fff' );

    defineShape(context, props.lineWidth, props.strokeStyle );

  };

  Canvas.prototype.renderBlock = function(props){
    props = props || {};
    var context = this.context;

    context.beginPath();

    context.rect(props.positionX, props.positionY, props.width, props.height);

    styleBg( context,  props.bgColor || '#fff' );

    this.styleFont(
      context,
      props.value,
      props.valueColor || '#000',
      props.width / 2.2 + props.positionX,
      ((props.height + this.fontSize) / 2) + props.positionY,
      FONT_SIZE + 'pt ' + FONT
    );

    defineShape(context, props.lineWidth, props.strokeStyle );

  };

  Canvas.prototype.styleFont = function(ctx, value,  color, posX, posY, font){
    ctx.fillStyle = color;
    ctx.font      = font;
    ctx.fillText(value, posX, posY);
  };

  function styleBg(ctx, color){
    ctx.fillStyle = color ;
    ctx.fill();
  }

  function defineShape(ctx, width, strokeStyle){
    ctx.lineWidth   = width;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
    ctx.closePath();
  }

  blocks_and_snake.Canvas = new Canvas();

})(window._blocks_and_snake);
