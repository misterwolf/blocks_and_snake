/* global describe, it, expect, beforeEach */

(function(Block) {

  'use strict';

  describe('#Block', function() {
    describe('#initialization', function() {
      var block = null;
      beforeEach(function(){
        block = new Block();
      });
      it('should contain a value', function() {
        expect(block.value).toBeDefined();
      });

      it('should have a positionY', function() {
        expect(block.positionY).toBeDefined();
      });

      it('should have a hardLevel', function() {
        expect(block.hardLevel).toBeDefined();
      });

      it('should have a positionX', function() {
        expect(block.positionY).toBeDefined();
      });

      it('should have a bgColor', function() {
        expect(block.bgColor).toBeDefined();
      });

      it('should have a valueColor', function() {
        expect(block.valueColor).toBeDefined();
      });

      it('should have a dimension', function() {
        expect(block.dimension).toBeDefined();
      });

    });

    describe('#bgColor', function() {

      it('should be blank if value 1 <=> 10', function() {
        var block = new Block();
        expect(block.bgColor).toBe('#ffffff');
      });

      it('should be light blue if value > 10 and < 20 ', function() {
        var block = new Block({value: 11});
        expect(block.bgColor).toBe('#00FFFF');
      });

      it('should be dark cyan if value > 30 and < 40 ', function() {
        var block = new Block({value: 31});
        expect(block.bgColor).toBe('#008B8B');
      });

      it('should be orange if value > 40 and < 50 ', function() {
        var block = new Block({value: 41});
        expect(block.bgColor).toBe('#FF8C00');
      });

      it('should be red if value > 50', function() {
        var block = new Block({value: 51});
        expect(block.bgColor).toBe('#FF0000');
      });

    });

    describe('#change', function() {
      var block = null;
      beforeEach(function(){
        block = new Block();
      });

      it('should change the value', function() {
        var nextValue = 3;
        block.change({value:nextValue});
        expect(block.value).toBe(nextValue);
      });

      it('should change the position', function() {
        var newPosition = [2,2];
        block.change({position: newPosition});
        expect(block.position).toEqual(newPosition);
      });

      it('should change the bgColor if value changes', function() {
        var newValue = 41;
        var oldColor = block.bgColor;
        block.change({value: newValue});
        expect(block.bgColor).not.toEqual(oldColor);
      });

      it('shouldn\'t change the color if value doesn\'t change', function() {
        var positionY = 10000;
        var tmpColor = block.bgColor;
        block.change({positionY: positionY});
        expect(block.bgColor).toEqual(tmpColor);
      });

    });

    describe('#setPositionY', function() {
      it('should increment by num passed with param', function() {
        var y = 10;
        var newY = 11;
        var block = new Block({ positionY: y});
        block.setPositionY(newY);
        expect(block.positionY).toEqual(newY);
      });
    });

    describe('#incrementYPosition', function() {
      it('should increment by one the y position', function() {
        var y = 10;
        var block = new Block({ positionY: y});
        block.incrementYPosition();
        expect(block.positionY).toEqual(y + 1);
      });
    });
  });

})(window._blocks_and_snake.Block);
