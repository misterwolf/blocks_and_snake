// read this:
// https://www.sitepoint.com/basic-animation-with-canvas-and-javascript/

//= require ./namespace
//= require ./lib/namespace
//= require ./lib/utility

(function(snake, utils){
  'use strict';

  // a block doesn't render it self.
  // the render mmethod must belong to another entities, where it renders all the existing block.
  // the sense is, a block doesn't know that it will be render on somewhere.
  // does it make sense?
  var iterateObject = utils.iterateObject;

  var COLORS = {
    1 : 'ffffff',
    11: '00FFFF',
    21: 'FF8C00',
    31: '008B8B',
    41: 'FF8C00',
    51: 'FF0000'
  };

  var Block = function(opts){

    opts           = opts || {};
    this.value     = opts.value     || 1;
    this.position  = opts.position  || [0,0]; // X,Y Axis.
    this.dimension = opts.dimension || [0,0]; // dimension in x,y
    this.color     = setColor(this.value);

  };

  /**
   * It changes all the block properties with the one passed
   */
  Block.prototype.change = function(props){

    props = props || {};
    var _this = this;

    iterateObject(props, function(key){
        _this[key] = props[key]; // reassign Block property
      }
    );

    this.color    = setColor(this.value);

  };

  /**
   * It reduces the block Y position of a step
   */
  Block.prototype.reduceYPosition = function(reduceBy){
    reduceBy = reduceBy || 1;
    this.position[1] = this.position[1] - reduceBy;
  };

  function setColor (value){

    return iterateObject(COLORS, function(key){
        if ( value <= key ) {
          return '#' + COLORS[key];
        }
      }
    );

  }

  snake.Block = Block;

})(window.snake, window.snake.lib.utility);
