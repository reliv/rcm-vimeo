var rcmVimeo = {
    /**
     * setAspectRatio
     * @param {jQuery} elem
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
     * @returns {*}
     */
    setAspectRatios: function () {
        var elems = jQuery('[rcm-vimeo-aspect-ratio]');

        for (var i = 0, len = elems.length; i < len; i++) {
            rcmVimeo.setAspectRatio($(elems[i]));
        }

        return elems;
    },
    /**
     * init
     */
    init: function () {
        var elems = rcmVimeo.setAspectRatios();
        for (var i = 0, len = elems.length; i < len; i++) {
            var elem = jQuery($(elems[i]));
            elem.resize(elem, function(){
                rcmVimeo.setAspectRatio($(this))
            });
        }

    }
};
//Wait for jQuery ready
jQuery(function () {
    rcmVimeo.init();
    jQuery(window).resize(rcmVimeo.setAspectRatios);
});

