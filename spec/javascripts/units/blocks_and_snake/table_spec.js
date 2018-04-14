/* global describe, it, expect, spyOn, beforeEach */

(function(blocks_and_snake) {

  'use strict';

  var Table   = blocks_and_snake.Table;
  blocks_and_snake.TableSlice = function(opts){

    opts = opts || {};
    this.empty     = opts.empty     || false;
    this.hardLevel = opts.hardLevel || 0;
    this.positionY = opts.positionY || 0;

    this.incrementPositionY = function(){

    };

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

      it('should have a snake', function(){
        var table = new Table();
        expect(table.snake).toBeDefined();
      });

      it('should fill the tableSliceList', function(){
        var table = new Table();
        var sliceNumber = table.tableSlicesList.length;
        while (sliceNumber) {
          expect(typeof table.tableSlicesList[sliceNumber - 1]).toBe('object');
          sliceNumber--;
        }
      });

    });

    describe('#moveSlices', function(){

      it('should call proper method for each tableSlice', function(){

        var anotherSlice = new blocks_and_snake.TableSlice();
        var anotherSlice2 = new blocks_and_snake.TableSlice();

        var table   = new Table({tableSlicesList: [ anotherSlice, anotherSlice2 ]});
        var sliceNumber = table.tableSlicesList.length;

        while (sliceNumber--) {
          spyOn(table.tableSlicesList[sliceNumber], 'incrementPositionY');
        }

        table.moveSlices();

        sliceNumber = table.tableSlicesList.length;
        while (sliceNumber--) {
          expect( table.tableSlicesList[sliceNumber].incrementPositionY).toHaveBeenCalled();
        }

      });

    });

    describe('#fillTableSlicesList', function(){
      var table = null;

      beforeEach(function(){
        table = new Table();
      });

      it('should fill the tableSlicesList with defined number of elements', function(){
        expect(table.tableSlicesList.length).toBe(table.height / table.heightForSlice + 1);
      });

      it('should sort list with Desc positionY', function(){
        // better keep static values: we can make a clearer idea about our purpose
        expect(table.tableSlicesList[0].positionY).toBe(  900 );
        expect(table.tableSlicesList[1].positionY).toBe(  800 );
        expect(table.tableSlicesList[2].positionY).toBe(  700 );
        expect(table.tableSlicesList[3].positionY).toBe(  600 );
        expect(table.tableSlicesList[4].positionY).toBe(  500 );
        expect(table.tableSlicesList[5].positionY).toBe(  400 );
        expect(table.tableSlicesList[6].positionY).toBe(  300 );
        expect(table.tableSlicesList[7].positionY).toBe(  200 );
        expect(table.tableSlicesList[8].positionY).toBe(  100 );
        expect(table.tableSlicesList[9].positionY).toBe(  0   );
        expect(table.tableSlicesList[10].positionY).toBe( -100 );

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
        table.addATableSlice(true);
        expect(table.tableSlicesList[currentLenght].empty).toBe(true);
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
