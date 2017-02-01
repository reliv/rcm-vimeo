/**
 *
 * @param instanceId
 * @param container
 * @param pluginHandler {RcmAdminPlugin}
 * @constructor
 */
var RcmVimeoEdit = function (instanceId, container, pluginHandler) {

    var self = this;

    self.instanceConfig = pluginHandler.instanceConfig;

    var ajaxPluginEditHelper = new AjaxPluginEditHelper(instanceId, container, pluginHandler);

    /**
     * initEdit
     */
    self.initEdit = function () {
        pluginHandler.getInstanceConfig(
            function (instanceConfig, defaultInstanceConfig) {
                self.instanceConfig = instanceConfig;
            }
        )
    };

    /**
     *
     * @returns {null|*}
     */
    self.getSaveData = function () {
        return self.instanceConfig;
    };

    /**
     * showEditDialog
     */
    self.showEditDialog = function () {

        var videoIdInput = jQuery.dialogIn(
            'text',
            'Video Id or Video page URL',
            self.instanceConfig.videoId
        );

        var downloadLinkInput = jQuery.dialogIn(
            'url',
            'Optional download link (Must be a non-expiring Vimeo link from the Vimeo admin screen.)',
            self.instanceConfig.downloadLink
        );

        var aspectRatioInput = jQuery.dialogIn(
            'text',
            'Set the aspect ratio for the video in format {width}:{height}.<br/>' +
            'Examples: 16:9, 4:3, 2.35:1, 2.39:1',
            self.instanceConfig.aspectRatio
        );

        var autoPlay = jQuery.dialogIn(
            'select',
            'AutoPlay',
            {
                '': 'None',
                'background': 'Play silently in the background when page loads',
                'autoplay': 'Play when page loads'
            },
            self.instanceConfig.autoPlay
        );

        $('<form></form>')
            .addClass('simple')
            .append(videoIdInput)
            .append(downloadLinkInput)
            .append(aspectRatioInput)
            .append(autoPlay)
            .dialog(
                {
                    title: 'Properties',
                    modal: true,
                    width: 620,
                    zIndex: 2000000,
                    buttons: {
                        Cancel: function () {
                            $(this).dialog("close");
                        },
                        Ok: function () {

                            self.instanceConfig.videoId = self.parseUrl(videoIdInput.val());
                            self.instanceConfig.downloadLink = downloadLinkInput.val();
                            self.instanceConfig.autoPlay = autoPlay.val();
                            var aspectRatio = aspectRatioInput.val();
                            if (!self.isValidRatio(aspectRatio)) {
                                window.alert(aspectRatio + ' is not a valid aspect ratio');
                                return;
                            }
                            self.setAspectRation(aspectRatio);

                            $(this).dialog("close");
                        }
                    }
                }
            );
    };

    self.isValidRatio = function (aspectRatio) {
        var parts = aspectRatio.split(':');
        if (parts.length !== 2) {
            return false;
        }

        var isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;

        return (isNumeric.test(parts[0]) && isNumeric.test(parts[1]));
    };

    /**
     * setAspectRation
     * @param aspectRatio
     */
    self.setAspectRation = function (aspectRatio) {
        self.instanceConfig.aspectRatio = aspectRatio;
        container.find('[rcm-vimeo-aspect-ratio]').attr(
            'rcm-vimeo-aspect-ratio',
            aspectRatio
        );
        rcmVimeo.setAspectRatios();
    };

    /**
     *
     * @param url
     * @returns {*}
     */
    self.parseUrl = function (url) {
        var values = url.split("/");

        return values.slice(-1)[0];
    };

    /**
     * attachPropertiesDialog
     */
    ajaxPluginEditHelper.attachPropertiesDialog(
        self.showEditDialog
    );
};
