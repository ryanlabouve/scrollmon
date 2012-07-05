# ryanlabouve/blankproj #

Make something happen when you scroll to some height on some element

## steps ##

- Watch the scroll position on an element
- Define a condition to watch for
- Provide a callback for if that condition is fulfilled

### example ###

	    $("#main").scrollmon({
	        condition: function() {
	            return $(this).scrollTop() > 200;
	        },
	        callback: function() {
	            $("body").toggleClass("asdf");
	        }
	    });

## arguments ##
_condition_
- function, returns boolean

_callback_
- function, what happens if condition is met upon scrolling

_namespace_
- provide namespace (one is generated automaticall by default)

_timeout_
- integer in ms, how long to fire event immediatly after firing event

_reset_timeout_
- integer in ms, how long until scrollmon will fire again immediatley

## defaults ##
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

## requires ##

- [cowboy / jquery-dotimeout][1]


[1]: https://github.com/cowboy/jquery-dotimeout