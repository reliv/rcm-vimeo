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
     *
     * @returns {null|*}
     */
    self.getSaveData = function () {
        return self.instanceConfig;
    };

    /**
     * getInstanceConfig
     * @param callback
     */
    self.getInstanceConfig = function(callback) {
        pluginHandler.getInstanceConfig(
            function(instanceConfig, defaultInstanceConfig) {
                self.instanceConfig = instanceConfig;
                callback(instanceConfig, defaultInstanceConfig);
            }
        )
    };

    /**
     * showEditDialog
     */
    self.showEditDialog = function () {

        var videoIdInput = jQuery.dialogIn(
            'text',
            'Video Id',
            self.instanceConfig.videoId
        );

        $('<form></form>')
            .addClass('simple')
            .append(videoIdInput)
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

                            console.log(videoIdInput.val());
                            self.instanceConfig.videoId = videoIdInput.val();

                            $(this).dialog("close");
                        }
                    }
                }
            );
    };

    /**
     * attachPropertiesDialog
     */
    ajaxPluginEditHelper.attachPropertiesDialog(
        function() {
            self.getInstanceConfig(
                self.showEditDialog
            );
        }
    );
};
