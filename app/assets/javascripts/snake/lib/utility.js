//= require ./namespace

(function(utility){

  'use strict';

  utility.iterateObject = function(obj, callback) {

    obj = obj || {};

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof callback === 'function') {
          var cbResult = callback(key);
          if (cbResult) {
            return cbResult;
          }
        }
      }
    }

  };

})(window.snake.lib.utility = {});
