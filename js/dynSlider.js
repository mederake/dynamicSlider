
(function ($) {

    $.fn.dynamicSlider = function (input) {

        var defaults = {
            progressBar: true,
            duration: 5000
        };

        if (typeof input === 'object') {
            var existingData = (this.data('dynslideroptions'));

            if (existingData) {
                var settings = $.extend({}, existingData, input);
                this.data('dynslideroptions', settings);
            } else {
                var settings = $.extend({}, defaults, input);
                this.data('dynslideroptions', settings);

            }

            _create.apply(this);

        } else if (typeof input === 'string') {
            if (methods[input]) {
                return methods[ input ].apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }
    };


    var methods = {
        next: function () {

            var allImages = this.find('.dynsliderItems img');
            var currentImage = allImages.filter('.active');

            if (currentImage.length < 1) {
                currentImage = allImages.first();
            }

            var nextImage = currentImage.next();

            if (nextImage.length < 1) {
                nextImage = allImages.first();
            }
            currentImage.removeClass('active');
            nextImage.addClass('active');

            // restart timeout
            _startTimeout.apply(this);
        },
        previous: function () {

            var allImages = this.find('img');
            var currentImage = allImages.filter('.active');

            if (currentImage.length < 1) {
                currentImage = allImages.last();
            }

            var previousImage = currentImage.prev();

            if (previousImage.length < 1) {
                previousImage = allImages.last();
            }
            currentImage.removeClass('active');
            previousImage.addClass('active');

            // restart timeout
            _startTimeout.apply(this);
        },
        add: function (image) {

            var newImg = null;

            if (typeof image === 'string') {

                var imgPath = image;
                var newImg = $('<img src="' + imgPath + '" alt="" />');
            } else if (typeof image === 'object') {
                newImg = image;
            }

            if (!newImg) {
                return;
            }

            var lastImage = this.find('img').last();

            if (lastImage) {
                lastImage.after(newImg);
            } else {
                this.prepend(newImg);
            }
            _setContainerHeight.apply(this);

        },
        remove: function (image) {

            if (typeof image === 'string') {
                var imageObj = this.find('img[src="' + image + '"]');

            } else if (typeof image === 'object') {
                imageObj = image;
            }

            if (imageObj.length < 1) {
                return;
            }

            if (!imageObj.hasClass('active')) {
                imageObj.remove();
                _setContainerHeight.apply(this);
            } else {
                // image is active: remove after delay time
                var options = this.data('dynslideroptions');
                var duration = options['duration'];
                var container = this;

                window.setTimeout(function () {
                    imageObj.remove();
                    _setContainerHeight.apply(container);
                }, duration);
            }

        }
    };



    function _create() {
        var container = $(this);
        var images = container.children('img');

        var options = this.data('dynslideroptions');

        container.addClass('dynsliderContainer');
        images.wrapAll('<div class="dynsliderItems"></div>');

        images.first().addClass('active');

        var resizeTimeout = null;

        $(window).on('resize', function () {
            if (resizeTimeout) {
                window.clearTimeout(resizeTimeout);
            }

            resizeTimeout = window.setTimeout(function () {
                _setContainerHeight.apply(container);
            }, 500);
        });

        $(window).on('load', function () {
            _setContainerHeight.apply(container);
        });

        if (options['progressBar']) {
            this.next('.dynsliderProgressbarContainer').remove(); // in case this is a re-initialization

            this.after('<div class="dynsliderProgressbarContainer"></div>');
            this.next('.dynsliderProgressbarContainer')
                    .html('<div class="dynsliderProgressbar"></div>');
        }

        _startTimeout.apply(container);
    }



    function _setContainerHeight() {
        var maxHeight = 0;
        this.find('img').each(function (index, element) {
            var imgHeight = $(element).height();

            if (maxHeight < imgHeight) {
                maxHeight = imgHeight;
            }
        });

        this.height(maxHeight);
    }

    function _startProgressBar() {
        var options = this.data('dynslideroptions');
        var duration = options['duration'];

        if (!options['progressBar']) {
            return null;
        }

        // reset progress bar
        this.next('.dynsliderProgressbarContainer')
                .html('<div class="dynsliderProgressbar"></div>');

        this
                .next('.dynsliderProgressbarContainer')
                .find('.dynsliderProgressbar')
                .animate({width: '100%'}, duration, 'linear');

    }

    var _sliderTimeout = null;

    function _startTimeout() {
        var thisObj = this;
        var options = this.data('dynslideroptions');
        var duration = options['duration'];

        if (!options['duration'] || options['duration'] <= 0) {
            return;
        }

        if (_sliderTimeout) {
            window.clearTimeout(_sliderTimeout);
        }

        _startProgressBar.apply(thisObj);

        _sliderTimeout = window.setTimeout(function () {

            methods[ 'next' ].apply(thisObj);

        }, duration);
    }

})(jQuery);