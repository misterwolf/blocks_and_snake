//= require ./namespace

/**
 * An EventEmitter implementation
 * from https://github.com/pazguille/jvent
 *
 * Stand-alone:
 *
 * ```
 * var emitter = _iub.jlib.Emitter.make();
 *
 * emitter.on('myEvent', cb);
 * emitter.off('myEvent', cb);
 * emitter.emit('myEvent', arg1, arg2, arg3, ...);
 * ```
 *
 * Inheriting:
 *
 * ```
 * function ClassWithEvents() {
 *   _iub.jlib.Emitter.make(this);
 * }
 * ```
 *
 * @class Emitter
 * @memberof _iub.jlib
 */
(function(Emitter){
  'use strict';

  /**
   * Turn an object into an emitter applying `Emitter`
   * constructor and  prototype to it.
   *
   * @param {Object}    object={}       An object to turn into `Emitter`
   * @returns {Object}                  Same object turned into emitter.
   * @function
   * @memberof snake.lib.Emitter
   */

  Emitter.make = function(object) {
    object = object || {};
    var listenersMap = {};

    var getListeners = function(evt) {
      listenersMap[evt] = listenersMap[evt] || [];
      return listenersMap[evt];
    };

    var addListener = function(evt, cb, once){
      var listeners = getListeners(evt);
      listeners.unshift({
        fn: cb,
        once: !!once
      });
    };

    object.on = function(evt, cb){
      console.log('hello!')
      addListener(evt, cb);
      return object;
    };

    object.once = function(evt, cb){
      addListener(evt, cb, true);
      return object;
    };

    object.off = function(evt, cb){
      var listeners = getListeners(evt);

      for (var i = listeners.length - 1; i >= 0; i--) {
        if (listeners[i].fn === cb) {
          listeners.splice(i, 1);
        }
      }

      return object;
    };

    object.emit = function(evt){
      var listeners = getListeners(evt);
      for (var i = listeners.length - 1; i >= 0; i--) {
        var listener = listeners[i];
        var args = Array.prototype.slice.call(arguments, 1);
        listener.fn.apply(null, args);
        if (listener.once) {
          listeners.splice(i, 1);
        }
      }
    };

    return object;
  };

}(window.snake.lib.Emitter = {}));
