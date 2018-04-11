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
  var FONT_SIZE    = 50;

  var Canvas = function(){
  };

  Canvas.prototype.init = function(opts){
    opts = opts || {};
    this.canvas        = opts.canvas      || document.getElementById('main-canvas');

    this.canvas.width  = opts.width       || WIDTH;
    this.canvas.height = opts.height      || HEIGHT;

    this.context       = this.canvas.getContext('2d');
    this.lineWidth     = opts.lineWidth   || LINE_WIDTH;
    this.strokeStyle   = opts.strokeStyle || STROKE_STYLE;
    this.fontSize      = opts.fontSize    || FONT_SIZE;
  };

  Canvas.prototype.clearRect = function(){
    this.context.clearRect(0, 0, this.width, this.height);
  };

  Canvas.prototype.renderShape = function(props){
    props = props || {};
    var context = this.context;

    context.beginPath();
    context.rect(props.positionX, props.positionY, props.width, props.height);

    context.fillStyle = props.bgColor || '#fff';
    context.fill();

    context.fillStyle = props.valueColor || '#000';
    context.font      = FONT_SIZE + 'pt ' + FONT;
    context.fillText(props.value, props.width / 2 + props.positionX, ((props.height + this.fontSize) / 2) + props.positionY);
    context.lineWidth   = this.lineWidth;
    context.strokeStyle = this.strokeStyle;
    context.stroke();
    context.closePath();

  };

  blocks_and_snake.Canvas = new Canvas();

})(window._blocks_and_snake);
