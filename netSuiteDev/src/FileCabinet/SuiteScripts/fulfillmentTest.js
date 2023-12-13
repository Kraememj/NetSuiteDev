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
            const thisRecord = context.newRecord
            const status = thisRecord.getValue({
                fieldId:'shipstatus'
            })
            if(status !== 'C' ){
                return true
            }
            log.debug('this record',thisRecord)
            const orderLine = thisRecord.getLineCount({
                sublistId:'item'
            })
            const orderArray = []
            for(let i=0; i<orderLine; i++){
                const getOrderLine = thisRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'orderline',
                    line: i
                })

                const isReceived = thisRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId:'itemreceive',
                    line: i
                })
                if(isReceived){
                    orderArray.push(getOrderLine)
                }
            }
            const salesOrderId = thisRecord.getValue({
                fieldId: 'createdfrom'
            })
            const salesOrderPage = record.load({
                type: 'salesorder',
                id: salesOrderId,
            });
            const salesOrderLine = salesOrderPage.getLineCount({
                sublistId: 'item'
            })
            for(let i=0; i<salesOrderLine; i++){
                const getSalesOrderLine = salesOrderPage.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'line',
                    line: i
                })
                if(orderArray.includes(getSalesOrderLine)){
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
