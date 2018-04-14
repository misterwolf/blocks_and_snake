//= require ./namespace
//= require ./table-slice

//= require ./lib/namespace
//= require ./lib/utility

(function(blocks_and_snake, lib){

  'use strict';

  var WIDTH             = 600;
  var HEIGHT            = 1000;
  var HEIGHT_FOR_SLICE  = 100;

  var Emitter           = lib.Emitter,
      iterateObject     = lib.utility.iterateObject,
      Snake             = blocks_and_snake.Snake,
      TableSlice        = blocks_and_snake.TableSlice;

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

    this.canvas           = opts.canvas          || {};
    this.snake            = opts.snake           || new Snake({canvas: this.canvas});

    this.height           = opts.height          || HEIGHT;
    this.heightForSlice   = opts.heightForSlice  || HEIGHT_FOR_SLICE;
    this.width            = opts.width           || WIDTH;
    this.hardLevel        = opts.hardLevel       || 1;
    this.tableSlicesList  = opts.tableSlicesList || [];

    Emitter.make(this);
    var _this = this;

    // fill tableSlicesList
    this.fillTableSlicesList();
    // var _this = this;
    // Observers
    this.on('table-slice-end',
      function(){
        _this.restoreTableSlicesList();
      }
    );

    this.on('go-on',

      function(by){
        by = by || 2;
        _this.moveSlices(by);
        _this.snake.render();
      }

    );
  };

  /**
   * it fill the list with empty TableSlice having Height/HeightForSlice element
   */
  Table.prototype.fillTableSlicesList = function(){
    var totElement = this.height / this.heightForSlice + 1;
    var i = 0;
    while ( i < totElement ) {
      if (typeof this.tableSlicesList[i] === 'undefined') {

        var tableSlice = new TableSlice({
            empty        : true,
            table        : this,
            canvas       : this.canvas,
            width        : this.width,
            heigh        : this.heightForSlice,
            heightBorder : this.height,
            positionY    : (totElement - i - 2) * this.heightForSlice // start with a negative position.
          });
        this.tableSlicesList[i] = tableSlice;

      }
      i++;
    }

  };

  /**
   * it restore the tableSlicesList
   */
  Table.prototype.restoreTableSlicesList = function(){
    this.removeFirstTableSlice();
    this.addATableSlice();
  };

  /**
   * it add a TableSlice in the proper list.
   */
  Table.prototype.addATableSlice = function(emptyElement){
    var tableSlice = new TableSlice({
        empty        : emptyElement,
        positionY    : -this.heightForSlice,
        nullPosition : false,
        hardLevel    : this.hardLevel,
        width        : this.width,
        canvas       : this.canvas,
        heightBorder : this.height,
        table        : this,
        height       : this.heightForSlice
      });

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
  Table.prototype.moveSlices = function(by){
    by = by || 1;
    var slices = this.tableSlicesList;

    iterateObject(slices, function(key){
      slices[key].incrementPositionY(by); // reset each Block.positionY;
    });
  };

  blocks_and_snake.Table = Table;

})(window._blocks_and_snake, window._blocks_and_snake.lib);
