/* global describe, it, expect */

(function(Table) {

  'use strict';

  describe('#Table', function() {
    it('should have a speed', function(){
      var table = new Table();
      expect(table.speed).toBeDefined();
    });
  });

})(window.Table);
