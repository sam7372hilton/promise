sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.sap.promise.promisefunction.controller.View1", {
            onInit: function () {
                this._onPromise(this);
                this._loadData(this)
                //added comments in branchcss
            },
            _onPromise: function (oEvent) {

            }
        });
    });
