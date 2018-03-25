//= require ./namespace
//= require ./block

(function(snake, utils){

  'use strict';

  var iterateObject = utils.iterateObject;
  var Block = snake.Block;
  var TableSlice = function(opts){

    opts                = opts                 || {};

    this.positionX      = opts.positionX       || [];  // nt column on the table.
    this.sliceHeight    = opts.sliceHeight     || 100;
    this.width          = opts.width           || 30;  // width  of the x axis
    this.blocksList     = opts.blocksList      || fillList(4);
  };

  /**
   * add a new block in the last position
   */
  TableSlice.prototype.addBlockInLastPosition = function(){
    var lastPosition = this.blocksList.length - 1;
    this.blocksList[lastPosition] = new snake.Block();
  };

  /**
   * FIFO: it removes the first element and then add a new one.
   */
  TableSlice.prototype.restoreElementsInList = function(){
    this.blocksList.shift();
    this.blocksList.push(null);
  };

  /**
   * it reset the blocks queue with a new one
   * @param {Array} blocksList: array of blocks
   */
  TableSlice.prototype.resetBlocksList = function(blocksList){
    this.blocksList = blocksList || fillList(this.blocksList.length);
  };

  /**
   * It move down all the blocks in list and then restore queue again.
   * @param {Function} cb: generic call back called after down all finished
   */
  TableSlice.prototype.completeCicle = function(cb){
    var blockHeight = this.sliceHeight;
    while (blockHeight--){
      this.moveBlocksDown();
    }
    this.restoreElementsInList();

    if (cb){
      cb();
    }

  };

  /**
   * it iterates all the blocks down of a step
   */
  TableSlice.prototype.moveBlocksDown = function(){

    var blocksList = this.blocksList;
    iterateObject(blocksList, function(key){
        blocksList[key].reducePosition(); // recalculate each Block.positionY;
      }
    );

  };

  function fillList(maxNum){
    var blockList = [];
    while (maxNum--){
      blockList[maxNum] = null;
    }
    return blockList;
  }

  snake.TableSlice = TableSlice;

})(window.snake, window.snake.lib.utility);
