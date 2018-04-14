/* global describe, it, expect, beforeEach, _f, spyOn */

(function(blocks_and_snake) {

  'use strict';

  blocks_and_snake.Block = function(){
    this.value      = 1;

    this.positionY  = 100;
    this.positionX  = 100;

    this.radius     = 5;

    this.width      = 20;
    this.height     = 20;

    this.bgColor    = '#fff';
    this.valueColor = '#000000';
  };

  blocks_and_snake.Snake = function(){
    this.value      = 1;

    this.positionY  = 100;
    this.positionX  = 100;

    this.radius     = 5;

    this.outline    = 2 * Math.PI;

    this.width      = 20;
    this.height     = 20;

    this.bgColor    = '#fff';
    this.valueColor = '#000000';
  };

  var SnakeMocked = blocks_and_snake.Snake;
  var BlockMocked = blocks_and_snake.Block;
  var canvas      = blocks_and_snake.Canvas;
  var block       = new BlockMocked();
  var snake       = new SnakeMocked();

  describe('#Canvas', function() {

    describe('#init', function() {

      beforeEach(function(done){
        _f.loadFixture('canvas_fixt.html', function(){ canvas.init(); done(); } );
      });

      it('should have a canvas', function(){
        expect(typeof canvas.canvas).toBe('object');
      });

      it('should have a defined context', function(){
        expect(typeof canvas.context.canvas).toBe('object');
      });

    });

    describe('#renderSnakeValue', function() {
      it('should define the main shape', function(){

        spyOn(canvas.context,'fillText');
        canvas.renderSnakeValue(snake);

        expect(canvas.context.fillText).toHaveBeenCalledWith(
          snake.value,
          snake.positionX,
          snake.positionY
        );

      });
    });

    describe('#renderSnake', function() {
      it('should define the main shape', function(){

        spyOn(canvas.context,'arc');
        canvas.renderSnake(snake);

        expect(canvas.context.arc).toHaveBeenCalledWith(
          snake.positionX,
          snake.positionY,
          snake.radius,
          0,
          snake.outline,
          true
        );

      });
    });

    describe('#renderBlock', function() {

      it('should define the main shape', function(){

        spyOn(canvas.context,'rect');
        canvas.renderBlock(block);

        expect(canvas.context.rect).toHaveBeenCalledWith(
          block.positionX,
          block.positionY,
          block.width,
          block.height
        );

      });

      it('should fill the shape', function(){

        spyOn(canvas.context,'fill');

        canvas.renderBlock(block);
        expect(canvas.context.fill).toHaveBeenCalled();
      });

      it('should stroke the shape', function(){

        spyOn(canvas.context,'stroke');

        canvas.renderBlock(block);
        expect(canvas.context.stroke).toHaveBeenCalled();
      });

      it('should add a text in the shape', function(){

        spyOn(canvas.context,'fillText');

        canvas.renderBlock(block);
        // centering text
        expect(canvas.context.fillText).toHaveBeenCalledWith(
          block.value,
          block.width / 2 + block.positionX,
          ((block.height + canvas.fontSize) / 2) + block.positionY
        );
      });
    });

  });

})(window._blocks_and_snake);
