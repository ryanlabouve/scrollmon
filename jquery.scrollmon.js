/* ryanlabouve/scrollmon (c) MIT 2012 */
;(function ( $, window, document, undefined ) {
    // Create the defaults once
    var pluginName = 'scrollmon',
        defaults = {
            condition: function() {
                return true;
            },
            callback: function() {
                console.log("callback!");
            },
            namespace: "",
            timeout: 500,
            reset_timeout: 2000,
            has_fired: false
        };
    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        
        init: function() {
            var that = this;
            $(this.element).on("scroll.scrollMon", function() {
                that.conditionWrapper(that.element, that.options);
            });
        },
        
        conditionWrapper: function(el, options) {
            // "this" for methods provided as element via function.call
            if(options.condition.call(el)) {
                // if timeout hasn't fired, fire immediately
                // if timeout has first, normal timeout interval
                timeout = Plugin.prototype.getTimeout(el, options);
                console.log(options);
                $.doTimeout(Plugin.prototype.getNamespace(el, options) + "scroll", timeout , function() {
                    options.callback.call(el);
                });
            }
        },

        getNamespace: function(el, options) {
            return options.namespace || ( "scrollmon" + $(el).attr("id") );
        },
        
        getTimeout: function(el, options) {
            timeout = options.has_fired ? options.timeout : 0;
            options.has_fired = true;
            $.doTimeout(Plugin.prototype.getNamespace(el, options) + "reset",
                        options.reset_timeout,
                        function() {
                            options.has_fired = false;
                        });
            return timeout;
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );