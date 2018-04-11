/* global describe, beforeEach, it, expect, spyOn */

(function(blocks_and_snake) {

  'use strict';

  var TableSlice = blocks_and_snake.TableSlice;

  blocks_and_snake.Block = function(opts){

    this.positionY = opts.positionY || 0;
    this.positionX = opts.positionX || 0;

    this.setPositionY = function(y){
      this.positionY = y;
    };
  };

  var Table = function(){
    this.emit = function(){

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

      it('should have a empty checker', function(){
        expect(tableSlice.empty).toBeDefined();
      });

      it('should have the table', function(){
        expect(tableSlice.table).toBeDefined();
      });

    });

    describe('#incrementPositionY', function() {

      it('should increment a positionY with by one', function(){
        var positionY  = 10;
        var tableSlice = new TableSlice({positionY: positionY});
        tableSlice.incrementPositionY();
        expect(tableSlice.positionY).toBe(positionY + 1);
      });

      it('should increment a positionY with parameter', function(){
        var positionY  = 10;
        var by         = 8;
        var tableSlice = new TableSlice({positionY: positionY});
        tableSlice.incrementPositionY(by);
        expect(tableSlice.positionY).toBe(positionY + by);
      });

      it('should increment block position when positionY <= heightBorder', function(){
        var tableSlice = new TableSlice();
        spyOn(tableSlice, 'incrementBlocksYPosition');
        tableSlice.incrementPositionY();
        expect(tableSlice.incrementBlocksYPosition).toHaveBeenCalled();
      });

      it('should fire event table-slice-end if positionY >= heightBorder', function(){
        var positionY  = 1;
        var table      = new Table();
        var tableSlice = new TableSlice({positionY: positionY, heightBorder: 2, table: table});
        spyOn(tableSlice.table, 'emit');
        tableSlice.incrementPositionY();
        expect(tableSlice.table.emit).toHaveBeenCalledWith('table-slice-end', tableSlice);
      });
    });

    describe('#fillBlockList', function() {
      describe('#with basic setting', function(){
        var tableSlice     = null;
        var blocksNumber   = null;
        var blockWidth     = null;

        beforeEach(function() {
          tableSlice   = new TableSlice();
          blockWidth   = tableSlice.blockWidth;
          blocksNumber = tableSlice.blocksList.length;
        });

        it('should set a list of block based of max num', function(){
          expect(tableSlice.blocksList.length).toBe( tableSlice.width / tableSlice.blockWidth );
        });

        it('should set a list of block with the same positionY', function(){
          while (blocksNumber--) {
            expect( tableSlice.blocksList[blocksNumber].positionY).toEqual(tableSlice.positionY);
          }
        });

        it('should set a list of block with the positionX increased', function(){
          while (blocksNumber--) {
            expect( tableSlice.blocksList[blocksNumber].positionX).toBe( (blockWidth * blocksNumber));
          }
        });
      });

      describe('#with advanced setting', function(){

        it('should set a list of blocks with one empty element on nullPosition', function(){
          var nullPosition = 1;
          var tableSlice = new TableSlice({nullPosition: nullPosition});
          expect( tableSlice.blocksList[nullPosition] ).toBe(undefined);
        });

        it('should set an empty list of blocks if empty is true', function(){
          var tableSlice = new TableSlice({empty: true});
          var blocksNumber = tableSlice.blocksList.length;
          while (blocksNumber--) {
            expect( tableSlice.blocksList[blocksNumber]).toBe(null);
          }
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
})(window._blocks_and_snake);
