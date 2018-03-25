/* global jasmine, describe, beforeEach, it, expect, spyOn */

(function(snake) {

  'use strict';

  var TableSlice = snake.TableSlice;

  snake.Block = function(){
    this.reducePosition = function(){
    };
  };

  TableSlice.Block = function(){};

  describe('#TableSlice', function() {
    describe('#initialization', function() {

      var blocksList     = null;
      var tableSlice     = null;

      beforeEach(function() {
        blocksList     = [1,2,3,4];
        tableSlice     = new TableSlice({blocksList: blocksList });
      });

      it('should have a position', function(){
        expect(tableSlice.positionX).toBeDefined();
      });

      it('should have a sliceHeight', function(){
        expect(tableSlice.sliceHeight).toBeDefined();
      });

      it('should have a width', function(){
        expect(tableSlice.width).toBeDefined();
      });

      it('should have a list of block based of max num', function(){
        expect(tableSlice.blocksList.length).toBe(blocksList.length);
      });

    });

    describe('#addBlockInLastPosition', function() {
      it('should add a block in the last position', function(){
        var tableSlice = new TableSlice();
        tableSlice.addBlockInLastPosition();
        var lastElement = tableSlice.blocksList.length - 1;
        expect(tableSlice.blocksList[lastElement]).toBeDefined();
      });
    });

    describe('#restoreElementsInList', function() {
      it('should remove the first element and put an empty at last index', function(){
        var blocksList = [1,2,3,4];
        var tableSlice = new TableSlice({blocksList: blocksList});
        tableSlice.restoreElementsInList();
        expect(tableSlice.blocksList).toEqual([2,3,4,null]);
      });
    });

    describe('#resetBlocksList', function() {

      var blocksList = null;
      var tableSlice = null;

      beforeEach(function() {
        blocksList = [1,2,3,4];
        tableSlice = new TableSlice({blocksList: blocksList});
      });

      it('should reset blocks list with the original length', function(){
        tableSlice.resetBlocksList();
        expect(tableSlice.blocksList.length).toEqual(blocksList.length);
      });

      it('should redefine blocksList with the one passed as parameter', function(){
        blocksList.push(5);
        tableSlice.resetBlocksList(blocksList);
        expect(tableSlice.blocksList).toEqual(blocksList);
      });

    });

    describe('#moveBlocksDown', function() {

      it('should call proper method for all blocks ', function(){
        var anotherBlock = new snake.Block();
        var tableSlice   = new TableSlice({blocksList: [anotherBlock]});

        spyOn(anotherBlock, 'reducePosition');

        tableSlice.moveBlocksDown();

        expect(anotherBlock.reducePosition).toHaveBeenCalled();

      });

    });

  });
})(window.snake);
