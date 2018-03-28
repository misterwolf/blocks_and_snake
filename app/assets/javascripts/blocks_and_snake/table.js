//= require ./namespace
//= require ./table-slice

//= require ./lib/namespace
//= require ./lib/utility

(function(blocks_and_snake, TableSlice, lib){

  'use strict';

  var WIDTH             = 600;
  var HEIGHT            = 1000;
  var HEIGHT_FOR_SLICE  = 100;

  var Emitter           = lib.Emitter;

  /**
   * The 'screen' containing all the visible elements
   *
   * @param {Object}    object={}  Object containing all the opts
   *    hardLevel      : position Y of the slice.
   *    width          : slice width
   *    height         : slice height
   *    heightForSlice : the width of a Block
   * @returns null
   * @function
   * @memberof snake
   */
  var Table = function(opts){

    opts                  = opts                 || {};

    this.height           = opts.height          || HEIGHT;
    this.heightForSlice   = opts.heightForSlice  || HEIGHT_FOR_SLICE;
    this.width            = opts.width           || WIDTH;
    this.hardLevel        = opts.hardLevel       || 1;
    this.tableSlicesList  = opts.tableSlicesList || [];

    Emitter.make(this);

    // fill tableSlicesList
    this.fillTableSlicesList();

    // Observers
    this.on('table-slice-end', this.restoreTableSlicesList);
    this.on('go-on',           this.moveSlices);
  };

  /**
   * it fill the list with empty TableSlice having Height/HeightForSlice element
   */
  Table.prototype.fillTableSlicesList = function(){
    var totElement = this.height / this.heightForSlice;

    while (totElement-- ) {
      if (typeof this.tableSlicesList[totElement] === 'undefined') {
        this.tableSlicesList[totElement] = null;
      }
    }

  };

  /**
   * it restore the tableSlicesList
   */
  Table.prototype.restoreTableSlicesList = function(){
    this.addATableSlice();
    this.removeFirstTableSlice();
  };

  /**
   * it add a TableSlice in the proper list.
   */
  Table.prototype.addATableSlice = function(emptyElement){
    var tableSlice = null;

    if (emptyElement) {
      tableSlice = new blocks_and_snake.TableSlice({
          nullPosition : false,
          hardLevel    : this.hardLevel,
          width        : this.width,
          heightBorder : this.height,
          height       : this.heightForSlice});
    }

    this.tableSlicesList.push(tableSlice);

  };

  /**
   * it remove the first element in the TableSlice list.
   */
  Table.prototype.removeFirstTableSlice = function(){
    delete this.tableSlicesList[0]; // delete object
    this.tableSlicesList.shift();
  };

  /**
   * it changes the current hardLevel.
   */
  Table.prototype.changeHardLevel = function(hardLevel){
    this.hardLevel = hardLevel;
  };

  /**
   * it run event moveslice for all the existing table-slices.
   */
  Table.prototype.moveSlices = function(cb){
    this.emit('move-slice', cb || function(){});
  };

  blocks_and_snake.Table = Table;

})(window._blocks_and_snake, window._blocks_and_snake.TableSlice, window._blocks_and_snake.lib);