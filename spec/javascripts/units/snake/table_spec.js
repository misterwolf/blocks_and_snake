/* global describe, it, expect, spyOn */

(function(snake) {

  'use strict';

  var Table   = snake.Table;
  snake.TableSlice = function(opts){

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
        var height = 10;
        var table = new Table({height: height});
        expect(table.height).toBe(height);
      });

      it('should have a width', function(){
        var width = 10;
        var table = new Table({width: width});
        expect(table.width).toBe(width);
      });

      it('should have a heightForSlice', function(){
        var heightForSlice = 10;
        var table = new Table({heightForSlice: heightForSlice});
        expect(table.heightForSlice).toBe(heightForSlice);
      });

      it('should have a difficulty level', function(){
        var table = new Table();
        expect(table.hardLevel).toBeDefined();
      });

    });
    describe('#initObservers', function(){

      it('should observe the table-slice-end event', function(){
        var table = new Table();
        spyOn(table, 'on');
        table.initObservers();
        expect(table.on).toHaveBeenCalledWith('table-slice-end', table.restoreTableSlicesList);
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
      it('should create a TableSlice', function(){
        var table = new Table();
        table.addATableSlice();
        expect(table.tableSlicesList.length).toBe(1);
      });
    });

    describe('#fillTableSlicesList', function(){

      it('should fill the tableSliceList calculated with heights', function(){
        var table = new Table();
        table.fillTableSlicesList();
        expect(table.tableSlicesList.length).toBe(table.height / table.heightForSlice);
      });

    });

    describe('#removeFirstTableSlice', function(){

      it('should remove the first element in TableSlice', function(){
        var anotherSlice = new snake.TableSlice();
        var anotherSlice2 = new snake.TableSlice();
        var table   = new Table({tableSlicesList: [ anotherSlice, anotherSlice2 ]});
        table.removeFirstTableSlice();
        expect(table.tableSlicesList.length).toBe(1);
        expect(table.tableSlicesList[0]).toBe(anotherSlice2);
      });

    });

  });

})(window.snake);
