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

        var pluginElm = jQuery(pluginHandler.getElm());

        var initialInstanceConfig = jQuery.extend({}, self.instanceConfig);

        var videoIdInput = jQuery.dialogIn(
            'text',
            'Video Id or Video page URL',
            self.instanceConfig.videoId
        );

        var aspectRatioInput = jQuery.dialogIn(
            'text',
            'Set the aspect ratio for the video in format {width}:{height}.<br/>' +
            '<em>Examples: 16:9, 4:3, 2.35:1, 2.39:1</em>',
            self.instanceConfig.aspectRatio
        );

        /* <autoPlay> */
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

        var overLayLinkInput = jQuery.dialogIn(
            'url',
            'Overlay link <br/>' +
            '<em>(Will cover the video with a link, leave empty for no link)</em>',
            self.instanceConfig.overlayLink
        );

        var setAutoPlayState = function (autoPlayType) {
            switch(autoPlayType) {
                case 'background':
                    overLayLinkInput.show();
                    break;
                default:
                    overLayLinkInput.hide();
            }
        };

        var handleAutoPlaySelect = function () {
            var elm = jQuery(this);
            setAutoPlayState(elm.val());
        };

        autoPlay.find('select').change(
            handleAutoPlaySelect
        );

        /* </autoPlay> */

        /* <downloadLink> */
        var downloadLinkTypeSelections = {
            'none': 'No download link',
            'vimeo-api': 'Auto (using vimeo API from rcm-vimeo-data)',
            'custom': 'Custom'
        };

        var downloadLinkTypeInput = jQuery.dialogIn(
            'select',
            'Optional download link',
            downloadLinkTypeSelections,
            self.instanceConfig.downloadLinkType
        );

        var downloadLinkInput = jQuery.dialogIn(
            'url',
            'Download link <br/>' +
            '<em>(Must be a non-expiring Vimeo link from the Vimeo admin screen.)</em>',
            self.instanceConfig.downloadLink
        );

        var downloadWidthInput = jQuery.dialogIn(
            'text',
            'Download video width in pixels <em>(optional)</em> ' +
            '<em>(Will find the closest available width.)</em><br/>' +
            '<em>Examples: 1080p = 1920, 720p = 1280, 480p = 720</em>',
            self.instanceConfig.downloadWidth
        );

        var setTypeState = function (downloadLinkType) {
            downloadLinkInput.hide();
            downloadWidthInput.hide();

            var downloadLinkElm = pluginElm.find('.rcm-vimeo-video-download');

            switch(downloadLinkType) {
                case 'vimeo-api':
                    downloadLinkElm.show();
                    downloadWidthInput.show();
                    break;
                case 'custom':
                    downloadLinkElm.show();
                    downloadLinkInput.show();
                    break;
                default:
                    downloadLinkElm.hide();
            }
        };

        downloadLinkInput.hide();
        downloadWidthInput.hide();

        var handleTypeSelect = function () {
            var elm = jQuery(this);
            setTypeState(elm.val());
        };

        downloadLinkTypeInput.find('select').change(
            handleTypeSelect
        );
        /* </downloadLink> */

        jQuery('<form></form>')
            .addClass('simple')
            .append(videoIdInput)
            .append(aspectRatioInput)
            .append(autoPlay)
            .append(overLayLinkInput)
            .append(downloadLinkTypeInput)
            .append(downloadLinkInput)
            .append(downloadWidthInput)
            .dialog(
                {
                    title: 'Properties',
                    modal: true,
                    width: 620,
                    zIndex: 2000000,
                    buttons: {
                        Cancel: function () {
                            setTypeState(initialInstanceConfig.downloadLinkType);
                            setAutoPlayState(initialInstanceConfig.autoPlay);
                            jQuery(this).dialog("close");
                        },
                        Ok: function () {
                            self.instanceConfig.videoId = self.parseUrl(videoIdInput.val());
                            self.instanceConfig.downloadLinkType = downloadLinkTypeInput.val();
                            self.instanceConfig.downloadLink = downloadLinkInput.val();
                            self.instanceConfig.downloadWidth = downloadWidthInput.val();
                            self.instanceConfig.autoPlay = autoPlay.val();
                            self.instanceConfig.overlayLink = overLayLinkInput.val();

                            setTypeState(self.instanceConfig.downloadLinkType);
                            setAutoPlayState(self.instanceConfig.autoPlay);

                            var aspectRatio = aspectRatioInput.val();
                            if (!self.isValidRatio(aspectRatio)) {
                                window.alert(aspectRatio + ' is not a valid aspect ratio');
                                return;
                            }
                            self.setAspectRation(aspectRatio);

                            jQuery(this).dialog("close");
                        }
                    }
                }
            );

        // Set initial state
        setTypeState(self.instanceConfig.downloadLinkType);
        setAutoPlayState(self.instanceConfig.autoPlay);
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
