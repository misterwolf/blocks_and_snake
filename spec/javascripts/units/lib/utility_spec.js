/* global describe, it, jasmine, expect */

(function(utility) {

  'use strict';

  describe('#Utility', function() {
    describe('#iterateObject', function(){

      it('should call the passed callback', function(){
        var obj = {test: 'test'};
        var dummy = jasmine.createSpy('dummy');
        utility.iterateObject( obj, dummy);
        expect(dummy).toHaveBeenCalled();
      });

      it('should return the callback value', function(){
        var obj = {test: 'test'};
        var testValue = 'test';
        var callback = function(){
          return testValue;
        };
        var returnValue = utility.iterateObject( obj, callback);
        expect(returnValue).toBe(testValue);
      });

    });
  });

})(window._blocks_and_snake.lib.utility);
