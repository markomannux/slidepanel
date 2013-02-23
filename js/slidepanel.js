(function( $ ) {
  
  var methods = {
    init: function(options) {

      var settings = $.extend( {
        'location'         : 'left',
      }, options);

      this.addClass('panel');
      var $triggerArea = $('<div class="trigger-area"></div>');
      this.after($triggerArea);
      var xDir = 1;
      this.data('location', settings.location)

      if (settings.location == 'right') {
        this.addClass('right');
        $triggerArea.addClass('right');
        xDir = -1;
      }

      var self = this;

      this.bind('swipeone', function(event, obj) {
        if (obj.direction.lastX == -1*xDir) {
          methods['hide'].apply(self);
        }
      });

      $triggerArea.bind('swipeone', function(event, obj) {
        console.log(obj);
        if (obj.direction.lastX == +1*xDir) {
          methods['show'].apply(self);
        }
      });

      return this;
    },

    hide: function() {
      this.hide('slide', {direction:this.data('location')}, 500);
    },

    show: function() {
      this.show('slide', {direction:this.data('location')}, 500);
    },
  };

  $.fn.slidepanel = function(method, options) {
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    } 
  };
})( jQuery );
