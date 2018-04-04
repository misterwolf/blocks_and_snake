/* global $, describe, it, document, expect, beforeEach, _f */

(function(dom){
  'use strict';

  describe('dom', function(){

    beforeEach(function(done){
      _f.loadFixture('dom_fixt.html', done);
    });

    describe('#id', function(){

      it('should return the element', function(){
        var htmlEl = dom.id('just-a-element');
        expect(htmlEl).toBeDefined();
        expect( htmlEl === document.getElementById('just-a-element') ).toBe(true);
      });

    });

    describe('#addEventListener', function(){

      it('Should observe an event (click)', function(done){
        var elem = dom.id('just-a-element');

        dom.addEventListener(elem, 'click', function(evt){
          expect(evt.target).toBe(elem);
          done();
        });

        $(elem).click();
      });

    });

  });

}(window._blocks_and_snake.lib.dom));
