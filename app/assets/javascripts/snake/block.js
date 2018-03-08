// read this:
// https://www.sitepoint.com/basic-animation-with-canvas-and-javascript/

//= require ./lib/namespace
//= require ./lib/utility

(function(w, utils){
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
    this.position  = opts.position  || [0,0]; // X,Y Axis. TO DO: Make some fixtures for position test
    this.color     = setColor(this.value);

  };

  Block.prototype.change = function(opts){

    opts = opts || {};
    var _this = this;

    iterateObject(opts, function(key){ // reassign Block property
        _this[key] = opts[key];
      }
    );

    this.color    = setColor(this.value);

  };

  function setColor (value){

    return iterateObject(COLORS, function(key){
        if ( value <= key ) {
          return '#' + COLORS[key];
        }
      }
    );

  }

  w.Block = Block;

})(window, window.lib.utility);
