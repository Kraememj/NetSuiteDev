/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/record', 'N/ui/serverWidget', 'N/search'],
    /**
     * @param{log} log
     * @param{record} record
     * @param serverWidget
     * @param search
     */

    (log, record, serverWidget, search) => {
        const beforeLoad = (context) => {
            const thisRecord = context.newRecord
            const form = context.form
            // add subTab
            form.addSubtab({
                id : 'custpage_subtab',
                label : 'Subtab'
            });
            log.debug("form", form)

            // add sublist
            const thisSublist = form.addSublist({
                id: 'custpage_sublist',
                type: serverWidget.SublistType.INLINEEDITOR,
                label: 'New Sublist',
                tab: 'custpage_subtab'
            })
            log.debug("this sublist",thisSublist)

            // Linked Transaction
            thisSublist.addField({
                id : 'custpage_linked_fulfillment',
                type : serverWidget.FieldType.SELECT,
                label : 'Linked Item Fulfillment',
                source: -30
            });

            // Status Field
            thisSublist.addField({
                id : 'custpage_status',
                type : serverWidget.FieldType.TEXT,
                label : 'Status'
            });

            // Currency Field
            thisSublist.addField({
                id : 'custpage_amount',
                type : serverWidget.FieldType.CURRENCY,
                label : 'Amount'
            });

            const customerId = thisRecord.getValue({
                fieldId: 'entity'
            })
            if (!customerId){
                return
            }
            const itemfulfillmentSearchObj = search.create({
                type: "itemfulfillment",
                filters:
                    [
                        ["type","anyof","ItemShip"],
                        "AND",
                        ["mainline","is","T"],
                        "AND",
                        ["entity","ANYOF",customerId]
                    ],
                columns:
                    [
                        "statusref",
                        "amount"
                    ]
            });
            let searchResultCount = itemfulfillmentSearchObj.runPaged().count;
            log.debug("itemfulfillmentSearchObj result count",searchResultCount);
            let counter = 0;
            itemfulfillmentSearchObj.run().each(function(result){
                const fulfillmentId = result.id
                const status = result.getValue({
                    name: 'statusref'
                })
                log.debug('status',status)
                const amount = result.getValue({
                    name : 'amount'
                })
                thisSublist.setSublistValue({
                    id:'custpage_linked_fulfillment',
                    line: counter,
                    value: fulfillmentId
                })
                thisSublist.setSublistValue({
                    id:'custpage_status',
                    line: counter,
                    value: status
                })
                thisSublist.setSublistValue({
                    id:'custpage_amount',
                    line: counter,
                    value: amount
                })
                counter++
                // .run().each has a limit of 4,000 results
                return true;
            });
        }


        return {beforeLoad}

    });
