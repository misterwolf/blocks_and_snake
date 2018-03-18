//= require ./namespace
//= require ./table-slice

(function(snake){

  'use strict';
  var Table = function(opts){

    opts                  = opts                 || {};

    this.height           = opts.height          || 100;
    this.width            = opts.width           || 30;

    this.tableSlicesList  = opts.tableSlicesList || [];

  };

  snake.Table = Table;

})(window.snake);
