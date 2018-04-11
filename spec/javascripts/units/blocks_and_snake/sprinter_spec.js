/* global jasmine, describe, it, spyOn, expect, beforeEach, afterEach */

(function(blocks_and_snake) {

  'use strict';

  var Sprinter   = blocks_and_snake.Sprinter;

  blocks_and_snake.Table = function(){
    this.emit = function(evt){
      return evt;
    };
  };

  blocks_and_snake.canvas = function(){
    this.clearRect = function(){

    };
  };

  describe('#Sprinter', function() {

    describe('#initialization', function(){

      var sprinter = null;

      beforeEach(function() {
        sprinter = new Sprinter();
      });

      it('should contain Table object', function(){
        expect(sprinter.table).toBeDefined();
      });

      it('should contain intervalObserver', function(){
        expect(sprinter.intervalObserver).toBeDefined();
      });

      it('should have a speed', function(){
        expect(sprinter.speed).toBeDefined();
      });

      it('should have a clearRect method', function() {
        expect(sprinter.clearRect).toBeDefined();
      });
    });

    describe('#start', function(){
      var sprinter      = null;

      beforeEach(function() {
        sprinter = new Sprinter( {table: new blocks_and_snake.Table() });
      });

      it('should spread the go-on event evert sprinter.intervalTime', function(done){

        spyOn(sprinter.table, 'emit');
        sprinter.start();
        setTimeout( function(){
              expect(sprinter.table.emit).toHaveBeenCalledWith('go-on', sprinter.speed);
              expect(typeof sprinter.intervalObserver).toBe('number');
              done();
            }, 1);

      });

    });
    describe('#stop', function(){

      it('should clearInterval', function(){
        spyOn(window, 'cancelAnimationFrame');
        var sprinter = new Sprinter();
        sprinter.stop();
        expect(window.cancelAnimationFrame).toHaveBeenCalledWith(sprinter.intervalObserver);
      });

    });

    describe('#decreaseSpeed', function(){

      it('should decrease speed by 1', function(){
        var sprinter = new Sprinter();
        var oldSpeed = sprinter.speed;
        sprinter.decreaseSpeed();
        expect(sprinter.speed).toBe(oldSpeed - 1);
      });

    });

    describe('#speedDown', function(){
      var speed = 1;
      var sprinter     = null;

      beforeEach(function() {
        sprinter = new Sprinter({speed: speed});
      });

    });

    describe('#increaseSpeed', function(){

      it('should increase speed by 1', function(){
        var sprinter = new Sprinter();
        var oldSpeed = sprinter.speed;
        sprinter.increaseSpeed();
        expect(sprinter.speed).toBe(oldSpeed + 1);
      });

    });

    describe('#speedUp', function(){
      var speed = 1;
      var sprinter     = null;

      beforeEach(function() {
        sprinter = new Sprinter({speed: speed});
      });

      it('should stop and start interval again', function(){
        var sprinter = new Sprinter();
        spyOn(sprinter, 'increaseSpeed');
        sprinter.speedUp();
        expect(sprinter.increaseSpeed).toHaveBeenCalled();
      });

    });

  });

})(window._blocks_and_snake);
