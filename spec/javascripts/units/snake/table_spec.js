/* global describe, it, expect */

(function(Table) {

  'use strict';

  describe('#Table', function() {

    describe('#initialization', function(){

      it('should have a list of tableSlices', function(){
        var table = new Table();
        expect(table.tableSlicesList).toBeDefined();
      });

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

    });

  });

})(window.snake.Table);
