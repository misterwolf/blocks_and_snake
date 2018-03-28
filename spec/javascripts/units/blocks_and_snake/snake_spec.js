/* global describe, it, expect, beforeEach, spyOn */

(function(blocks_and_snake) {

  'use strict';

  var Snake = blocks_and_snake.Snake;

  describe('#Snake', function() {

    describe('#initialization', function(){
      var snake = null;

      beforeEach(function(){
        snake = new Snake();
      });

      it('should have a value', function(){
        expect(snake.value).toBeDefined();
      });

      it('should have a position on horizontal line', function(){
        expect(snake.positionX).toBeDefined();
      });

      it('should have a position on vertical line', function(){
        expect(snake.positionY).toBeDefined();
      });

      it('should have a bgColor', function(){
        expect(snake.bgColor).toBeDefined();
      });

      it('should have a lower limit x', function(){
        expect(snake.lowerXLimit).toBeDefined();
      });
      it('should have a greater limit x', function(){
        expect(snake.greaterXLimit).toBeDefined();
      });

    });

    describe('#incrementValue', function(){

      it('should incrementValue by one', function(){
        var snake = new Snake();
        var oldValue = snake.value;
        snake.incrementValue();
        expect(snake.value).toBe(oldValue + 1);
      });

    });

    describe('#decrementValue', function(){
      it('should decrementValue by one', function(){
        var snake = new Snake({positionX: 1, lowerXLimit: 1});
        var oldValue = snake.value;
        snake.decrementValue();
        expect(snake.value).toBe(oldValue - 1);
      });
      it('should emit the snake-null event', function(){
        var justOne = 1;
        var snake = new Snake({value: justOne});
        spyOn(snake, 'emit');
        snake.decrementValue();
        expect(snake.emit).toHaveBeenCalledWith('snake-null');
      });
    });

    describe('#moveToTheLeft', function(){

      it('should reduce the positionX by one', function(){
        var snake = new Snake({positionX: 2});
        var oldPositionX = snake.positionX;
        snake.moveToTheLeft();
        expect(snake.positionX).toBe(oldPositionX - 1);
      });

      it('should not exceed the left limit', function(){
        var snake = new Snake({positionX: 1, lowerXLimit: 1});
        var oldPositionX = snake.positionX;
        snake.moveToTheLeft();
        expect(snake.positionX).not.toBeLessThan(oldPositionX);
      });

    });

    describe('#moveToTheRight', function(){

      it('should increment the positionX by one', function(){
        var snake = new Snake();
        var oldPositionX = snake.positionX;
        snake.moveToTheRight();
        expect(snake.positionX).toBe(oldPositionX + 1);
      });

      it('should not exceed the right limit', function(){
        var snake = new Snake({positionX: 1, greaterXLimit: 1});
        var oldPositionX = snake.positionX;
        snake.moveToTheRight();
        expect(snake.positionX).not.toBeGreaterThan(oldPositionX);
      });

    });

  });

})(window._blocks_and_snake);
