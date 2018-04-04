//= require ./namespace
//= require ./lib/namespace
//= require ./lib/utility
//= require ./lib/emitter

(function(blocks_and_snake, lib){
  'use strict';

  // a block doesn't render it self.
  // the render mmethod must belong to another entities, where it renders all the existing block.
  // the sense is, a block doesn't know that it will be render on somewhere.
  // does it make sense?

  var iterateObject = lib.utility.iterateObject,
      Emitter       = lib.Emitter;

  var WIDTH         = 40;
  var HEIGHT        = 40;

  var BG_COLORS = {
    1 : 'ffffff',
    11: '00FFFF',
    21: 'FF8C00',
    31: '008B8B',
    41: 'FF8C00',
    51: 'FF0000'
  };

  var Block = function(opts){

    opts            = opts            || {};

    this.value      = opts.value      || 1;

    this.positionY  = opts.positionY  || 0;
    this.positionX  = opts.positionX  || 0;

    this.width      = opts.width      || WIDTH;
    this.height     = opts.heigth     || HEIGHT;

    this.bgColor    = setBgColor(this.value);
    this.valueColor = '#000000';

    Emitter.make(this);

  };

  /**
   * It changes all the block properties with the ones passed
   */
  Block.prototype.change = function(props){

    props = props || {};
    var _this = this;

    iterateObject(props, function(key){
        _this[key] = props[key]; // reassign Block property
      }
    );

    this.bgColor    = setBgColor(this.value);

  };

  /**
   * It changes the Y position with new passed value
   */
  Block.prototype.setPositionY = function(y){
    y = y || 0;
    this.positionY = y;
  };

  /**
   * It increments the block Y position of a step
   */
  Block.prototype.incrementYPosition = function(){
    this.positionY++;
  };

  function setBgColor (value){

    return iterateObject(BG_COLORS, function(key){
        if ( value <= key ) {
          return '#' + BG_COLORS[key];
        }
      }
    );

  }

  blocks_and_snake.Block = Block;

})(window._blocks_and_snake, window._blocks_and_snake.lib);
