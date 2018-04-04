
window._blocks_and_snake.lib.dom = window._blocks_and_snake.lib || {};

(function(doc, dom) {
  'use strict';

  /*
    shortname for getElementById!
   */
  dom.id = function(id){
    return doc.getElementById(id);
  };
  
  /**
   * Creates a dom element
   */
  dom.create = function(tagName) {
    return doc.createElement(tagName);
  };

  /**
   * Trigger an event crossBrowser
   */
  dom.trigger = function(target, type, event) {
    if (doc.createEvent) {
      event = new Event(type);
      target.dispatchEvent(event);
    } else {
      event = doc.createEventObject();
      target.fireEvent('on' + type, event);
    }
  };

  /**
   * Cross Browser addEventListener
   */
  dom.addEventListener = function( obj, type, fn, useCapture, checkEvent) {

    if ('msPointerEnabled' in window.navigator) {
      if (type === 'touchstart' ) {
        type = 'MSPointerDown';
      } else if (type === 'touchmove') {
        type = 'MSPointerMove';
      } else if (type === 'touchend') {
        type = 'MSPointerUp';
      }
    }
    if ( obj.attachEvent ) {
      if (!checkEvent){
        obj.attachEvent( 'on' + type, fn); // in this way detach will work.
      } else {
        obj.attachEvent( 'on' + type, function(evt){
          evt = evt || window.event;
          if (typeof evt.target === 'undefined') {
            evt.target = evt.srcElement;
          }
          fn(evt);
        });
      }
    } else {
      obj.addEventListener( type, fn, !!useCapture );
    }
  };

  /**
   * Cross Browser removeEventListener
   */
  dom.removeEventListener = function( obj, type, fn, useCapture ) {
    useCapture = useCapture || false;
    if ( obj.detachEvent ) {
      obj.detachEvent( 'on' + type, fn, useCapture);
      obj[type + fn] = null;
    } else {
      obj.removeEventListener( type, fn, useCapture );
    }
  };

})(document, window._blocks_and_snake.lib);
