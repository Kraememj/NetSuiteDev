/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/log'],
    /**
 * @param{record} record
 */

        /**
         * Defines the function definition that is executed before record is loaded.
         */
        function(record, log) {
            // add a button to Sales Orders called “Test Button”
            const beforeLoad = (context) => {
                const form = context.form
                form.addButton({
                    id: 'custpage_custombutton',
                    label: 'Test Button',
                    functionName: 'test_set_getValue'
                });

            }

        /**
         * Defines the function definition that is executed before record is submitted.
         */
            // When the record is saved, the “Item Note” sublist
            // field to be set as “December Sales Order” for ALL lines on the SO.
        const beforeSubmit = (context) => {
            const thisRecord = context.newRecord;
            const lineCount = thisRecord.getLineCount({sublistId: 'item'});
            for (let i=0;i<lineCount;i++){
                thisRecord.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_ns_pos_itemnote',
                    line: i,
                    value: 'DECEMBER 2023 SALES ORDER'
                })
            }

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         */
        //   Whenever the Sales Order record is saved
            //   set the field that name is “Last Modified Sales Order”
            //   on the customer record that is related to the Sales Order with the Sales Order Internal ID.
        const afterSubmit = (context) => {
            const thisRecord = context.newRecord;
            const salesOrderId = thisRecord.id;
            //get the customer record,
            const customerId = thisRecord.getValue({
                fieldId : "entity"
            })
            log.debug('test','somethinghere')
            // load the customer record,
            const loadCustomer = record.load({
                type: "customer",
                id: customerId,
            });

            // set your new field with SO sales order ID,
            loadCustomer.setValue({
                fieldId: 'custentity_last_mod_salesorder',
                value: salesOrderId
            })
            // saved customer record
            const saveRecord = loadCustomer.save()
        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
