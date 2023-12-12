/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/log', 'N/search'],

    function(record, log, search) {


        const afterSubmit = (context) => {
        //         get value of comments on customer record page
                const thisRecord = context.newRecord
                const customerId = thisRecord.id
                const customerComments = thisRecord.getValue({
                        fieldId: 'comments'
                })

                const salesorderSearchObj = search.create({
                        type: "salesorder",
                        filters:
                            [
                                    ["mainline","is","T"],
                                    "AND",
                                    ["type","anyof","SalesOrd"],
                                    "AND",
                                    ["name","anyof",customerId]
                            ],
                        columns:
                            [
                                    "internalid",
                                    "tranid",
                            ]
                });
                salesorderSearchObj.run().each(function(result){
                        // .run().each has a limit of 4,000 results
                    log.debug('saved search sales order', result)
                    const orderId = result.getValue({
                        name: 'tranid'
                    })
                    log.debug('orderId', orderId)
                    const salesOrderPage = record.load({
                        type: 'salesorder',
                        id: result.id,
                    })
                    salesOrderPage.setValue({
                        fieldId: 'memo',
                        value: customerComments
                    })
                    salesOrderPage.save()
                        return true;
                });
        }

        return {afterSubmit}

    });
