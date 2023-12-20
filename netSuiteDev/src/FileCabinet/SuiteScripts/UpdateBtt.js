/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {

        const beforeLoad = (context) => {
            context.form.addButton({
                id : 'custpage_updateBtt',
                label : 'Update Item Fulfillments',
                functionName: 'onButtonClick'
            })
            context.form.clientScriptModulePath = 'SuiteScripts/UpdateItemBtt.js'
        }

        return {beforeLoad}

    });
