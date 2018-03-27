/* global jasmine, describe, it, spyOn, expect, beforeEach, afterEach */

(function(snake) {

  'use strict';

  var Sprinter   = snake.Sprinter;

  snake.Table = function(){

  };

  describe('#Sprinter', function() {

    describe('#initialization', function(){

      var sprinter = null;

      beforeEach(function() {
        sprinter = new Sprinter();
      });

      it('should contain Table object', function(){
        expect(sprinter.table).toEqual(snake.Table);
      });

      it('should have a speed', function(){
        expect(sprinter.speed).toBeDefined();
      });

      it('should have a intervalObserver', function(){
        expect(sprinter.intervalObserver).toBeDefined();
      });

      it('should have a intervalTime', function(){
        expect(sprinter.intervalTime).toBeDefined();
      });

    });

    describe('#start', function(){
      var sprinter      = null;

      beforeEach(function() {
        jasmine.clock().install();
        sprinter = new Sprinter();
      });
      afterEach(function() {
        jasmine.clock().uninstall();
      });

      it('should spread the go-on event evert sprinter.intervalTime', function(){

        spyOn(sprinter, 'emit');
        expect(sprinter.emit).not.toHaveBeenCalled();

        sprinter.start();

        jasmine.clock().tick(sprinter.intervalTime + 5);
        expect(sprinter.emit).toHaveBeenCalledWith('go-on', sprinter.afterGoOn);

      });

    });
    describe('#stop', function(){

      it('should clearInterval', function(){
        spyOn(window, 'clearInterval');
        var sprinter = new Sprinter();
        sprinter.stop();
        expect(window.clearInterval).toHaveBeenCalledWith(sprinter.intervalObserver);
      });

    });

    describe('#increaseSpeed', function(){

      it('should increase speed', function(){
        var sprinter = new Sprinter();
        var oldSpeed = sprinter.speed;
        sprinter.increaseSpeed();
        expect(sprinter.speed).toBe(oldSpeed + 1);
      });

      it('should set a new intervalTime', function(){
        var sprinter = new Sprinter();
        var oldintervalTime = sprinter.intervalTime;
        sprinter.increaseSpeed();
        expect(sprinter.intervalTime).toBeLessThan(oldintervalTime);
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
        spyOn(sprinter, 'stop');
        spyOn(sprinter, 'start');
        sprinter.speedUp();
        expect(sprinter.stop).toHaveBeenCalled();
        expect(sprinter.start).toHaveBeenCalled();
      });

    });

  });

})(window.snake);
