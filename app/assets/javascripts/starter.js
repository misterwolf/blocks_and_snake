(function(window) {

  'use strict';

  var base = window._blocks_and_snake;
  var dom  = base.lib.dom;

  dom.ready(function(){
    var sprinter = new base.Sprinter();
    sprinter.start();

    var table    = new base.Table();
    var canvas   = new base.Canvas();

  });

})(window);
