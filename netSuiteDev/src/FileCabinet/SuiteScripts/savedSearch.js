/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/log', 'N/search'],
    /**
     * @param{record} record
     * @param log
     * @param search
     */
    function(record, log, search) {
        /**
         * Defines the function definition that is executed before record is loaded.
         */
        const beforeLoad = (context) => {

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         */
        const beforeSubmit = (context) => {




        }

        /**
         * Defines the function definition that is executed after record is submitted.
         */
        const afterSubmit = (context) => {
            const thisRecord = context.newRecord;
            const customerId = thisRecord.id;
            const customerCommentsId = thisRecord.getValue({
                fieldId : "comments"
            })
            // load the sales order record

            // Create Sales Order Saved search to find all sales orders for this customer
            // Replace the Name field, which is the customer field, with this Customer
            // Internal ID
            let salesorderSearchObj = search.create({
                type: "salesorder",
                filters:
                    [
                        ["type","anyof","SalesOrd"],
                        "AND",
                        ["name","anyof",customerId],
                        "AND",
                        ["mainline","is","T"]
                    ],
                columns:
                    [
                        "internalid",
                        "tranid"
                    ]
            });
            salesorderSearchObj.run().each(function(savedSearchLine){
                // Result is going to give you one line of the search result, like in the UI
                log.debug('saved search line', savedSearchLine)

                // RESULT USES NAME IN GET VALUE NOT FIELDID
                const tranId = savedSearchLine.getValue({
                    name: 'tranid'
                })
                log.debug('tranid',tranId)
                // Load each sales order, and set the value
                const loadSalesOrder = record.load({
                    type: 'salesorder',
                    id: savedSearchLine.id
                })
                loadSalesOrder.setValue({
                    fieldId: 'memo',
                    value: customerCommentsId
                })
                loadSalesOrder.save()
                return true;
            });
        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
