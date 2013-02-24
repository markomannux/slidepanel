(function( $ ) {
  
  var methods = {
    init: function(options) {

      var settings = $.extend( {
        'location'         : 'left',
        'triggerArea'      : undefined,
        'backgroundColor'      : 'gray',
        'width'            : '250'
      }, options);

      this.data('width', settings.width)
      methods['setLocation'].apply(this, [settings.location]);

      var $panelContent = $('<div class="panel-content"></div>').html(this.html());


      this.html($panelContent);
      this.addClass('panel');
      this.css('background-color', settings.backgroundColor);
      this.width(settings.width);
      this.addClass(settings.location);

      var self = this;

      function show(event) {
        methods['show'].apply(self);
      };

      function hide(event) {
        methods['hide'].apply(self);
      };

      var wipeLeftPanelBehav = hide;
      var wipeRightPanelBehav = undefined;
      var wipeLeftTriggerBehav = undefined;
      var wipeRightTriggerBehav = show;

      if (settings.location == 'right') {
        this.addClass(settings.location);
        var wipeLeftPanelBehav = undefined;
        var wipeRightPanelBehav = hide;
        var wipeLeftTriggerBehav = show;
        var wipeRightTriggerBehav = undefined;
      }

      this.touchwipe({
        wipeLeft: wipeLeftPanelBehav,
        wipeRight: wipeRightPanelBehav,
        preventDefaultEvents: false
      });

      if (settings.triggerArea) {
        settings.triggerArea.touchwipe({
          wipeLeft: wipeLeftTriggerBehav,
          wipeRight: wipeRightTriggerBehav,
          preventDefaultEvents: false
        });
      }

      return this;
    },

    show: function() {
      var self = this;
      this.show({duration:0,
                 complete:function() {
        self.animate({transform: 'translateX(0)'});
      }});
    },

    hide: function() {
      var self = this;
      this.animate({transform: 'translateX(' + this.data('hiddenPosition') + ')'},
            function() {
              self.hide();
            }
            );
          },

    setLocation: function(location) {
      
      this.hide({duration:0});
      var hiddenPosition = this.data('width') + 'px'
      if (location == 'left') {
        hiddenPosition = '-' + hiddenPosition
      }

      this.data('hiddenPosition', hiddenPosition)
      this.removeClass('left right');
      this.addClass(location);
      this.animate({transform: 'translateX(' + this.data('hiddenPosition') + ')'})
    }

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
