/* global jasmine, $, Teaspoon, console */

(function(w, $){

  'use strict';

  // the only way to load fixtures in a separate file. All the already defined method will no work
  window.functionalities = window.functionalities || {};

  window._f = {
    loadFixture: function(name, done){
      if (!$('#my-fixtures').length) {
        $(document.body).append('<div id="my-fixtures"></div>');
      }

      var url = Teaspoon.root + '/fixtures/' + name;

      $.get(url, function(content){
        var parsed = $($.parseHTML(content, document, true));
        var el = $('#my-fixtures')[0];
        $('#my-fixtures').empty();

        for (var i = 0; i < parsed.length; i++) {
          el.appendChild(parsed[i]);
        }

        setTimeout(function(){
          if (done){ done();}
        }, 10);
      });
    }
  };

})(window, $);
