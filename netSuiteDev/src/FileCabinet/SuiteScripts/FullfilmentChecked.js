/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/record'],
    /**
 * @param{log} log
 * @param{record} record
 */
    (log, record) => {

        const afterSubmit = (context) => {
            const thisRecord = context.newRecord;
            // get the status of the order on the item fulfillment page if it is shipped
            const shipStatus = thisRecord.getValue({
                fieldId: 'shipstatus'
            })
            log.debug('ship Status', shipStatus);

            if (shipStatus !== 'C'){
                return
            }
            // get the value of the sublist line on the item fulfillment page and loop through and push it in the array

            const orderLineArray = []
            const iFulLineCount = thisRecord.getLineCount({sublistId:'item'});
            for (let i=0; i<iFulLineCount; i++){
                const orderLine = thisRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'orderline',
                    line: i
                })
                orderLineArray.push(orderLine)
            }

            const salesOrderID = thisRecord.getValue({
             fieldId: 'createdfrom'
            })
            const salesOrderPage = record.load({
                type: 'salesorder',
                id: salesOrderID
            })
            log.debug('sales order ID', salesOrderID)
            const lineCount = salesOrderPage.getLineCount({sublistId:'item'})
            for (let i=0; i<lineCount; i++){
                const soLine = salesOrderPage.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'line',
                    line: i
                });
                if (orderLineArray.includes(soLine) === true){
                    salesOrderPage.setSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_fulfillment_shipped',
                        line: i,
                        value: true
                    })
                }

            }

            salesOrderPage.save()
            return true
        }

        return {afterSubmit}

    });
