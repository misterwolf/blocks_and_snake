/* global describe, it, expect, spyOn, beforeEach */

(function(blocks_and_snake) {

  'use strict';

  var Table   = blocks_and_snake.Table;
  blocks_and_snake.TableSlice = function(opts){

    opts = opts || {};
    this.empty     = opts.empty     || false;
    this.hardLevel = opts.hardLevel || 0;

    this.moveBlocksDown = function(){
    };
    this.stopBlocks = function(){
    };

  };
  describe('#Table', function() {

    describe('#initialization', function(){

      it('should have a height', function(){
        var height = 500;
        var table = new Table({height: height});
        expect(table.height).toBe(height);
      });

      it('should have a width', function(){
        var width = 10;
        var table = new Table({width: width});
        expect(table.width).toBe(width);
      });

      it('should have a heightForSlice', function(){
        var heightForSlice = 500;
        var table = new Table({heightForSlice: heightForSlice});
        expect(table.heightForSlice).toBe(heightForSlice);
      });

      it('should have a difficulty level', function(){
        var table = new Table();
        expect(table.hardLevel).toBeDefined();
      });

      it('should fill the tableSliceList having size in relation with heights', function(){
        var table = new Table();
        expect(table.tableSlicesList.length).toBe(table.height / table.heightForSlice);
      });

      it('should fill the tableSliceList with fake elements', function(){
        var table = new Table();
        var sliceNumber = table.tableSlicesList.length;
        while (sliceNumber) {
          expect( table.tableSlicesList[sliceNumber - 1]).toBe(null);
          sliceNumber--;
        }
      });

    });

    describe('#changeHardLevel', function(){
      it('should change the difficulty level', function(){
        var newHardLevel = 10;
        var table = new Table({hardLevel: 1});
        table.changeHardLevel(newHardLevel);
        expect(table.hardLevel).toBe(newHardLevel);
      });
    });

    describe('#addATableSlice', function(){
      it('should add a TableSlice', function(){
        var table = new Table();
        var currentLenght = table.tableSlicesList.length;
        table.addATableSlice();
        expect(table.tableSlicesList.length).toBe(currentLenght + 1);
      });

      it('should add a null element if parameter == true', function(){
        var table = new Table();
        var currentLenght = table.tableSlicesList.length;
        table.addATableSlice(false);
        expect(table.tableSlicesList[currentLenght]).toBe(null);
      });

    });

    describe('#removeFirstTableSlice', function(){

      it('should remove the first element in TableSlice', function(){
        var anotherSlice = new blocks_and_snake.TableSlice();
        var anotherSlice2 = new blocks_and_snake.TableSlice();

        var table   = new Table({tableSlicesList: [ anotherSlice, anotherSlice2 ]});
        var currentLenght = table.tableSlicesList.length;

        table.removeFirstTableSlice();

        expect(table.tableSlicesList.length).toBe( currentLenght - 1 );
        expect(table.tableSlicesList[0]).toBe(anotherSlice2);
      });

    });

  });

})(window._blocks_and_snake);
