/* global describe, it, expect, beforeEach, _f, spyOn */

(function(blocks_and_snake) {

  'use strict';

  var Render = blocks_and_snake.Render;

  blocks_and_snake.Block = function(){
    this.value      = 1;

    this.positionY  = 150;
    this.positionX  = 100;

    this.width      = 20;
    this.height     = 20;

    this.bgColor    = '#fff';
    this.valueColor = '#000000';
  };
  var BlockMocked = blocks_and_snake.Block;

  describe('#Canvas', function() {

    beforeEach(function(done){
      _f.loadFixture('canvas_fixt.html', done);
    });

    describe('#initialization', function() {

      it('should have a canvas', function(){
        var render = new Render();
        expect(typeof render.canvas).toBe('object');
      });

      it('should have a defined context', function(){
        var render = new Render();
        expect(typeof render.context.canvas).toBe('object');
      });

    });

    describe('#renderShape', function() {

      var render = null;
      var block  = null;

      beforeEach(function(){
        block  = new BlockMocked();
        render = new Render();
      });

      it('should define the main shape', function(){

        spyOn(render.context,'rect');
        render.renderShape(block);

        expect(render.context.rect).toHaveBeenCalledWith(
          block.positionX,
          block.positionY,
          block.width,
          block.height
        );

      });

      it('should fill the shape', function(){

        spyOn(render.context,'fill');

        render.renderShape(block);
        expect(render.context.fill).toHaveBeenCalled();
      });

      it('should stroke the shape', function(){

        spyOn(render.context,'stroke');

        render.renderShape(block);
        expect(render.context.stroke).toHaveBeenCalled();
      });

      it('should add a text in the shape', function(){

        spyOn(render.context,'fillText');

        render.renderShape(block);
        expect(render.context.fillText).toHaveBeenCalledWith(
          block.value,
          block.positionX / 2,
          block.positionY / 2
        );
      });
    });

  });

})(window._blocks_and_snake);
