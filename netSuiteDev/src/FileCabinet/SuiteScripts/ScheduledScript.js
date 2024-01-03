/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} context
         * @param {string} context.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (context) => {
            search.create({
                type: "salesorder",
                filters:
                    [
                        ["type","anyof","SalesOrd"],
                        "AND",
                        ["mainline","is","T"],
                        "AND",
                        ["internalid","anyof","1","10","100","102","103","106","108","109","115","116"]
                    ],
            }).run().each(function(result) {

                let salesOrderId = result.id;
                log.debug("Sales Order ID", salesOrderId);

                // Submit a new value for a sales order's memo field.

               let updatedSalesOrder = record.submitFields({
                    type: record.Type.SALES_ORDER,
                    id: salesOrderId,
                    values: {
                        memo: 'ABCD'
                    },
                    options: {
                        enableSourcing: false,
                        ignoreMandatoryFields : true
                    }
                });
               log.debug("Updated Sales Order", updatedSalesOrder)
                return true;
            });
        }

        return {execute}

    });
