/* global describe, it, expect */

(function(Block) {

  'use strict';

  describe('#Block', function() {
    describe('#initialization', function() {

      it('should contain a value', function() {
        var block = new Block();
        expect(block.value).toBeDefined();
      });

      it('should have a position on table', function() {
        var block = new Block();
        expect(block.position).toBeDefined();
      });

      it('should have a color', function() {
        var block = new Block();
        expect(block.color).toBeDefined();
      });

      it('should have a dimension', function() {
        var block = new Block();
        expect(block.dimension).toBeDefined();
      });

    });

    describe('#color', function() {

      it('should be blank if value 1 <=> 10', function() {
        var block = new Block();
        expect(block.color).toBe('#ffffff');
      });

      it('should be light blue if value > 10 and < 20 ', function() {
        var block = new Block({value: 11});
        expect(block.color).toBe('#00FFFF');
      });

      it('should be dark cyan if value > 30 and < 40 ', function() {
        var block = new Block({value: 31});
        expect(block.color).toBe('#008B8B');
      });

      it('should be orange if value > 40 and < 50 ', function() {
        var block = new Block({value: 41});
        expect(block.color).toBe('#FF8C00');
      });

      it('should be red if value > 50', function() {
        var block = new Block({value: 51});
        expect(block.color).toBe('#FF0000');
      });

    });

    describe('#change', function() {
      it('should change the value', function() {
        var nextValue = 3;
        var block = new Block();
        block.change({value:nextValue});
        expect(block.value).toBe(nextValue);
      });

      it('should change the position', function() {
        var newPosition = [2,2];
        var block = new Block();
        block.change({position: newPosition});
        expect(block.position).toEqual(newPosition);
      });

      it('should change the color', function() {
        var newValue = 41;
        var block = new Block();
        var oldColor = block.color;
        block.change({value: newValue});
        expect(block.color).not.toEqual(oldColor);
      });

      it('shouldn\'t change the color if value doesn\'t change', function() {
        var newPosition = [2,2];
        var block = new Block();
        var tmpColor = block.color;
        block.change({position: newPosition});
        expect(block.color).toEqual(tmpColor);
      });

    });

    describe('#reduceYPosition', function() {
      it('should decrement by one the y position', function() {
        var y = 10;
        var block = new Block({ position: [0,y]});
        block.reduceYPosition();
        expect(block.position).toEqual([0, y - 1]);
      });
      it('should decrement by num passed with param', function() {
        var y = 10;
        var reduceBy = 8;
        var block = new Block({ position: [0,y]});
        block.reduceYPosition(reduceBy);
        expect(block.position).toEqual([0, y - reduceBy]);
      });
    });
  });

})(window.snake.Block);
