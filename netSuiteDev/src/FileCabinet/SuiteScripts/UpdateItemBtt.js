/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord'],

function(currentRecord) {

    function pageInit(context) {

    }
    function onButtonClick(){
        let thisRecord = currentRecord.get();
        let salesOrderId = thisRecord.id
        window.open("https://tstdrv2212745.app.netsuite.com/app/site/hosting/scriptlet.nl?script=264&deploy=1&salesOrderId=" + salesOrderId)
        console.log("Sales order ID: ", salesOrderId)

    }

    return {
        pageInit: pageInit,
        onButtonClick: onButtonClick
    };

});
