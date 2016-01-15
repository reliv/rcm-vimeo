var rcmVimeo = {
    /**
     * setAspectRatio
     * @param elem
     */
    setAspectRatio: function (elem) {
        var width = elem.width();
        var ratioParts = elem.attr('rcm-vimeo-aspect-ratio').split(':');
        var xRatio = ratioParts[0];
        var yRatio = ratioParts[1];
        var newHeight = Math.ceil((width * yRatio / xRatio));
        elem.height(newHeight);
    },
    /**
     * setAspectRatios
     * @returns {elem Collection}
     */
    setAspectRatios: function () {
        var elems = jQuery('[rcm-vimeo-aspect-ratio]');

        jQuery.each(
            elems, function () {
                var elem = $(this);
                rcmVimeo.setAspectRatio(elem);
            }
        );

        return elems;
    },
    /**
     * init
     */
    init: function () {
        var elems = rcmVimeo.setAspectRatios();
        jQuery.each(
            elems,
            function () {
                var elem = $(this);
                elem.resize(elem, rcmVimeo.setAspectRatio);
            }
        );
    }
};
// Run onReady
jQuery(rcmVimeo.init);
// Run when window is resized
jQuery(window).resize(rcmVimeo.setAspectRatios);
