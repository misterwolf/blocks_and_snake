/* global describe, it, expect, beforeEach, _f, spyOn */

(function(blocks_and_snake) {

  'use strict';

  blocks_and_snake.Block = function(){
    this.value      = 1;

    this.positionY  = 100;
    this.positionX  = 100;

    this.width      = 20;
    this.height     = 20;

    this.bgColor    = '#fff';
    this.valueColor = '#000000';
  };

  var BlockMocked = blocks_and_snake.Block;
  var canvas      = blocks_and_snake.Canvas;
  var block       = new BlockMocked();

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

    describe('#renderShape', function() {

      it('should define the main shape', function(){

        spyOn(canvas.context,'rect');
        canvas.renderShape(block);

        expect(canvas.context.rect).toHaveBeenCalledWith(
          block.positionX,
          block.positionY,
          block.width,
          block.height
        );

      });

      it('should fill the shape', function(){

        spyOn(canvas.context,'fill');

        canvas.renderShape(block);
        expect(canvas.context.fill).toHaveBeenCalled();
      });

      it('should stroke the shape', function(){

        spyOn(canvas.context,'stroke');

        canvas.renderShape(block);
        expect(canvas.context.stroke).toHaveBeenCalled();
      });

      it('should add a text in the shape', function(){

        spyOn(canvas.context,'fillText');

        canvas.renderShape(block);
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
