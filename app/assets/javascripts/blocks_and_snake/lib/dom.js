
window._blocks_and_snake.lib.dom = window._blocks_and_snake.lib || {};

(function(doc, dom) {
  'use strict';

  /*
    shortname for getElementById!
   */
  dom.id = function(id){
    return doc.getElementById(id);
  };

  dom.ready = function(fn) {
    var done = false, top = true,
    win = window,
    doc = document,
    root = doc.documentElement,
    modern = doc.addEventListener,

    add = modern ? 'addEventListener' : 'attachEvent',
    rem = modern ? 'removeEventListener' : 'detachEvent',
    pre = modern ? '' : 'on',

    init = function(e) {
      if (e.type === 'readystatechange' && doc.readyState !== 'complete') {
        return;
      }
      (e.type === 'load' ? win : doc)[rem](pre + e.type, init, false);
      if (!done && (done = true)) {
        fn.call(win, e.type || e);
      }
    },

    poll = function() {
      try { root.doScroll('left'); } catch (e) { setTimeout(poll, 50); return; }
      init('poll');
    };

    // At startup, IE readyState will be always loading and (almost) never interactive
    // (I suppose because it is slower that other browser or simply because I use a virtual machine).
    // So to simulate the DomReady true / false, we need to check the initial state
    // (if 'loading' or 'interactive' )
    var stateIsReady = null;
    var readyStateHandled = false;

    if (doc.readyState === 'loading') { // if loading, it pretty soon will change, so we can handle it through onreadystatechange method
      // usually used in IE.
      doc.onreadystatechange = function () {
        if (readyStateHandled === false) { // avoid to trigger again the check when the status is changed.
          stateIsReady = doc.readyState === 'complete';
          startCs(stateIsReady);
          readyStateHandled = true;
        }
      };
    } else {
      // otherwise start soon!
      stateIsReady = doc.readyState === 'complete';
      startCs(stateIsReady);
    }

    // --------------------------------------------------------

    function startCs(stateIsReady){
      if (stateIsReady) {
        fn.call(win, 'lazy');
      } else {

        if (!modern && root.doScroll) {
          try { top = !win.frameElement; } catch (e) { }
          if (top) {
            poll();
          }
        }
        // HERE I COMMENTED THE two registration events because here will be always called for a onload event.
        // doc[add](pre + 'DOMContentLoaded', init, false);
        // doc[add](pre + 'readystatechange', init, false);
        window[add](pre + 'load', init, false); // here the CS will start only with load event (that is closest similar to readyState==complete), the other instead normally.
      }
    }
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
