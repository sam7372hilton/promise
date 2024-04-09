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
                Promise.all([
                    fetch('https://services.odata.org/V3/Northwind/Northwind.svc/Products(1)?$format=json'),
                    fetch('https://services.odata.org/V3/Northwind/Northwind.svc/Products(2)?$format=json')
                ]).then(responses => {
                    return Promise.all(responses.map(res => res.json()))
                }).then(data => console.log(data))
            },
            _loadData: function (oEvent) {
                fetch('https://services.odata.org/V3/Northwind/Northwind.svc/Products(1)?$format=json').then(Response => Response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error("Failed to load data", error));
            },
            // promise in odata
             _warehouseData: function () {
                var data = this.returnData();
                data.then(function (data) {
                    var model = new JSONModel(data);
                    this._displayModel.setProperty("/WarehouseSet", data.results)
                }.bind(this)).catch(function (oError) {
                    //some error
                }.bind(this));
                
            },
            returnData: function () {
                return new Promise(function (resolve, reject) {
                    this._warehouseDataModel.read("/WarehouseSet", {
                        success: function (oData, oResponse) {
                            resolve(oData)
                        }.bind(this),
                        error: function (error) {
                            reject(error)
                        }.bind(this)
                    });
                }.bind(this))
            },
        });
    });
