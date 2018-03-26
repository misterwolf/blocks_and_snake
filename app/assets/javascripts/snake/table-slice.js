//= require ./namespace
//= require ./block

(function(snake, lib){

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

    opts              = opts            || {};

    this.positionY    = opts.positionY  || 0;
    this.hardLevel    = opts.hardLevel  || 1;
    this.height       = opts.height     || 100;
    this.width        = opts.width      || 600;
    this.blockWidth   = opts.blockWidth || BLOCK_WIDTH; // width of a Single Block
    this.heightBorder = opts.heightBorder || HEIGHT_BORDER;

    this.blocksList   = this.fillBlockList(opts.nullPosition);

    Emitter.make(this);

    this.on('move-slice', function(){
        this.incrementPositionY(this.incrementBlocksYPosition);
      }
    );
  };

  /**
   * it reduces the positionY by one and
   * emit 'table-slice-end' event if positionY == 0
   */
  TableSlice.prototype.incrementPositionY = function(cb){
    this.positionY++;

    if (this.positionY >= this.heightBorder) {
      this.emit('table-slice-end', this);
    } else {
      cb = cb || function(){};
      cb();
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

      var block = new snake.Block({
        hardLevel : this.hardLevel,
        dimension : [BLOCK_WIDTH, this.height],
        positionX : (this.blockWidth * maxNum),
        positionY : this.positionY
      });

      blockList[maxNum] = block;
    }

    delete blockList[nullPosition];

    return blockList;
  };

  snake.TableSlice = TableSlice;

})(window.snake, window.snake.lib);
