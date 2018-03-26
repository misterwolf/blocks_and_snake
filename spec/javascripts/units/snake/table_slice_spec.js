/* global describe, beforeEach, it, expect, spyOn */

(function(snake) {

  'use strict';

  var TableSlice = snake.TableSlice;

  snake.Block = function(opts){

    this.positionY = opts.positionY || 0;
    this.positionX = opts.positionX || 0;

    this.setPositionY = function(y){
      this.positionY = y;
    };
  };

  describe('#TableSlice', function() {

    describe('#initialization', function() {

      var tableSlice     = null;

      beforeEach(function() {
        tableSlice     = new TableSlice();
      });

      it('should have a Y position', function(){
        expect(tableSlice.positionY).toBeDefined();
      });

      it('should have a height', function(){
        expect(tableSlice.height).toBeDefined();
      });

      it('should have a width', function(){
        expect(tableSlice.width).toBeDefined();
      });

      it('should have a blockWidth', function(){
        expect(tableSlice.blockWidth).toBeDefined();
      });

      it('should have a hardLevel', function(){
        expect(tableSlice.hardLevel).toBeDefined();
      });

      it('should have a list of block', function(){
        expect(tableSlice.blocksList).toBeDefined();
      });

    });

    describe('#incrementPositionY', function() {
      it('should increment a positionY with by one', function(){
        var positionY  = 10;
        var tableSlice = new TableSlice({positionY: positionY});
        tableSlice.incrementPositionY();
        expect(tableSlice.positionY).toBe(positionY + 1);
      });
      it('should fire event table-slice-end if positionY >= heightBorder', function(){
        var positionY  = 1;
        var tableSlice = new TableSlice({positionY: positionY, heightBorder: 2});
        spyOn(tableSlice, 'emit');
        tableSlice.incrementPositionY();
        expect(tableSlice.emit).toHaveBeenCalledWith('table-slice-end', tableSlice);
      });
    });

    describe('#fillBlockList', function() {
      describe('#basicSetting', function(){
        var tableSlice     = null;
        beforeEach(function() {
          tableSlice     = new TableSlice();
        });

        it('should set a list of block based of max num', function(){
          expect(tableSlice.blocksList.length).toBe( tableSlice.width / tableSlice.blockWidth );
        });

        it('should set a list of block with the same positionY', function(){
          var blocksNumber = tableSlice.blocksList.length;
          while (blocksNumber) {
            expect( tableSlice.blocksList[blocksNumber - 1].positionY).toEqual(tableSlice.positionY);
            blocksNumber--;
          }
        });

        it('should set a list of block with the positionX increased', function(){
          var blocksNumber = tableSlice.blocksList.length;
          while (blocksNumber) {
            var blockWidth = tableSlice.blockWidth;
            expect( tableSlice.blocksList[blocksNumber - 1].positionX).toBe( (blockWidth * blocksNumber) - blockWidth);
            blocksNumber--;
          }
        });
      });

      describe('#advancedSetting', function(){
        it('should set a list of block with one empty element on nullPosition', function(){
          var nullPosition = 1;
          var tableSlice = new TableSlice({nullPosition: nullPosition});
          expect( tableSlice.blocksList[nullPosition] ).toBe(undefined);
        });
      });

    });

    describe('#incrementBlocksYPosition', function() {

      it('should call proper method for all blocks passing the current positionY ', function(){
        var tableSlice   = new TableSlice();

        var blocksNumber = tableSlice.blocksList.length;

        while (blocksNumber) {
          spyOn(tableSlice.blocksList[blocksNumber - 1], 'setPositionY');
          blocksNumber--;
        }

        tableSlice.incrementBlocksYPosition();

        blocksNumber = tableSlice.blocksList.length;
        while (blocksNumber) {
          expect( tableSlice.blocksList[blocksNumber - 1].setPositionY).toHaveBeenCalledWith(tableSlice.positionY);
          blocksNumber--;
        }
      });

    });

  });
})(window.snake);
