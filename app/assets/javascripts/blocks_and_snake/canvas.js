//= require ./namespace
//= require ./lib/namespace

// read this:
// https://www.sitepoint.com/basic-animation-with-canvas-and-javascript/
// http://codetheory.in/20-best-canvas-tutorials-and-examples-that-will-make-you-a-canvas-master/

// context.beginPath();
// context.rect(188, 50, 200, 100);
// context.fillStyle = 'yellow';
// context.fill();
// context.lineWidth = 7;
// context.strokeStyle = 'black';
// context.stroke();

(function(blocks_and_snake){

  'use strict';

  var STROKE_STYLE = '#000';
  var LINE_WIDTH   = 2;
  var FONT         = 'sans-serif';
  var FONT_SIZE    = '20pt';

  var Render = function(opts){
    opts = opts || {};
    this.canvas       = opts.canvas      || document.getElementsByTagName('canvas')[0];
    this.context      = this.canvas.getContext('2d');
    this.lineWidth    = opts.lineWidth   || LINE_WIDTH;
    this.strokeStyle  = opts.strokeStyle || STROKE_STYLE;
  };

  Render.prototype.renderShape = function(props){
    props = props || {};
    var context = this.context;

    context.rect(props.positionX, props.positionY, props.width, props.height);

    context.fillStyle = props.bgColor || '#fff';
    context.fill();

    context.fillStyle = props.valueColor || '#fff';
    context.font      = FONT_SIZE + ' ' + FONT;
    context.fillText(props.value, props.positionX / 2, props.positionY / 2);

    context.lineWidth   = this.lineWidth;
    context.strokeStyle = this.strokeStyle;
    context.stroke();

  };

  blocks_and_snake.Render = Render;

})(window._blocks_and_snake);
