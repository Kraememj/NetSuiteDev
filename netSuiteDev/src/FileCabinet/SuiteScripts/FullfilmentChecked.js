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
                const itemReceive = thisRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'itemreceive',
                    line: i
                })
                if (itemReceive) {
                    const orderLine = thisRecord.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'orderline',
                        line: i
                    })
                    orderLineArray.push(orderLine)
                }
            }

            // get the sales order value on the item fulfillment and then load to the sales order page
            const salesOrderID = thisRecord.getValue({
             fieldId: 'createdfrom'
            })
            const salesOrderPage = record.load({
                type: 'salesorder',
                id: salesOrderID
            })
            log.debug('sales order ID', salesOrderID)
            // get value of sublist on the sales order page and loop through if it's available in the order line array
            // so match the order line in the item fulfillment page with line in the sales order page the check the
            // fulfillment shipped on the sales order page
            const lineCount = salesOrderPage.getLineCount({sublistId:'item'})
            for (let i=0; i<lineCount; i++){
                const soLine = salesOrderPage.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'line',
                    line: i
                });
                if (orderLineArray.includes(soLine)){
                    salesOrderPage.setSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_fulfillment_shipped',
                        line: i,
                        value: true
                    })
                }
                log.debug('order line array',orderLineArray)
                log.debug('Sales order Line',soLine)
            }

            salesOrderPage.save()
            return true
        }

        return {afterSubmit}

    });
