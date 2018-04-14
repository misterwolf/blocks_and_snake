//= require ./namespace
//= require ./block

(function(blocks_and_snake, lib){

  'use strict';

  var BLOCK_WIDTH   = 100;
  var HEIGHT_BORDER = 1000;

  var iterateObject = lib.utility.iterateObject;
  var Emitter       = lib.Emitter;

  /**
   * An horizontal line with height and width (same as Table) containing a list of block
   *
   * @param {Object} object={} Object containing all the opts
   *    positionY  : position Y of the slice.
   *    width      : slice width
   *    height     : slice height
   *    blockWidth : the width of a Block
   *    nullPosition : it defined a null element in specific position
   * @returns null
   * @function
   * @memberof snake
   */
  var TableSlice = function(opts){

    opts              = opts              || {};

    this.positionY    = opts.positionY    || 0;
    this.empty        = opts.empty        || false;
    this.hardLevel    = opts.hardLevel    || 1;
    this.height       = opts.height       || 100;
    this.width        = opts.width        || 600;
    this.blockWidth   = opts.blockWidth   || BLOCK_WIDTH; // width of a Single Block
    this.heightBorder = opts.heightBorder || HEIGHT_BORDER;
    this.blocksList   = opts.blocksList   || [];

    this.table        = opts.table        || {};
    this.canvas       = opts.canvas       || {};

    if (!this.empty){
      this.blocksList = this.fillBlockList(opts.nullPosition);
    }

    Emitter.make(this);

  };

  /**
   * it reduces the positionY by one and
   * emit 'table-slice-end' event if positionY == 0
   */
  TableSlice.prototype.incrementPositionY = function(by){
    by = by || 1;
    this.positionY = this.positionY + by;

    if (this.positionY >= this.heightBorder) {
      this.table.emit('table-slice-end', this);
    } else {
      this.incrementBlocksYPosition();
    }

  };

  /**
   * it iterates all the blocks down of a step
   */
  TableSlice.prototype.incrementBlocksYPosition = function(){
    var _this = this;
    var blocksList = this.blocksList;
    iterateObject(blocksList, function(key){
      blocksList[key].setPositionY(_this.positionY); // reset each Block.positionY;
    });
  };

  TableSlice.prototype.fillBlockList = function (nullPosition) {

    var blockList    = [];
    var maxNum       = this.width / this.blockWidth;

    while (maxNum--) {

      var block = new blocks_and_snake.Block({
        hardLevel : this.hardLevel,
        width     : BLOCK_WIDTH,
        canvas    : this.canvas,
        height    : this.height,
        positionX : (this.blockWidth * maxNum),
        positionY : this.positionY
      });

      blockList[maxNum] = block;
    }

    delete blockList[nullPosition];

    return blockList;
  };

  blocks_and_snake.TableSlice = TableSlice;

})(window._blocks_and_snake, window._blocks_and_snake.lib);
