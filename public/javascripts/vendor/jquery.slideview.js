(function($) {
	
	var methods = {
		append: function(src) {
			var $container = this.data("slideview-container");
			var settings = this.data("slideview-settings");
			var size = settings.size || 75;
			var $img = $('<div><img src="' + src + '"/></div>');

			$img.css({
				margin: 0, padding: 0,
				width: size, height: size*0.75,
				overflow: 'hidden', 'float': 'left',
				boder: 0
			});

			settings.numSlides += 1;

			$container.css("width", "+=" + size);
			$container.append($img);
		}
	};

	$.fn.slideview = function(slides, settings) {
		if (typeof slides === "string") {
			switch(slides) {
				case "append":
					methods.append.call(this, settings);
				break;
			}
		} else {
			this.each(function() {
				init(this, slides, settings);
			});
		}

		return this;
	}
	
	function init(element, slides, settings) {
		if ($.isFunction(slides)) slides = slides(element);
		var size = settings.size || 75;
		
		var $el = $(element);
		var $viewport  = $el.css({ overflow: 'hidden', position: 'relative' }).addClass('slideview-viewport').empty();
		var $container = $('<div></div>').css({ overflow: 'hidden', margin: 0, padding: 0, border: 0, width: (size*slides.length) + 'px' })
										.addClass('slideview-container').appendTo($viewport);
		
		for (i = 0; i < slides.length; i++) {
			$('<div><img src="' + slides[i] + '" alt=""/></div>')
				.css({ margin: 0, padding: 0, width: size + 'px', height: size*0.75, overflow: 'hidden', 'float': 'left', border: 0 })
				.addClass('slideview-slide').appendTo($container);
		}

		$el.data("slideview-container", $container);
		$el.data("slideview-settings", settings)

		settings.numSlides = slides.length;

		$viewport.bind('mousemove.slideview', function(evt) {
			var $this = $(this);
			var x = evt.pageX - $this.offset().left;
			var offset = Math.floor(x / (size / settings.numSlides)) * size;
			$this.animate({ scrollLeft: offset }, 10);
			return false;
		});
	}
	
})(jQuery);