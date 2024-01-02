/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/search'],
    /**
     * @param{serverWidget} serverWidget
     * @param search
     */
    (serverWidget, search) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} context
         * @param {ServerRequest} context.request - Incoming request
         * @param {ServerResponse} context.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (context) => {

            log.debug("On request method?", context.request.method)

            if(context.request.method == "GET"){

                const form = serverWidget.createForm({
                    title: 'First Suitelet Form'
                });

                form.addResetButton({
                    label : 'Reset Button'
                });

                form.addSubmitButton({
                    label : 'Submit Button'
                });

                let fieldgroup = form.addFieldGroup({
                    id: 'custpage_usergroup',
                    label: 'User Information'
                });

                let fname = form.addField({
                    id : 'custpage_fname',
                    type : serverWidget.FieldType.TEXT,
                    label : 'First Name',
                    container: 'custpage_usergroup'
                }).isMandatory= true;

                let fLastName = form.addField({
                    id : 'custpage_flastname',
                    type : serverWidget.FieldType.TEXT,
                    label : 'Last Name',
                    container: 'custpage_usergroup'
                }).isMandatory= true;

                let fEmail = form.addField({
                    id : 'custpage_femail',
                    type : serverWidget.FieldType.EMAIL,
                    label : 'Email',
                    container: 'custpage_usergroup'
                });

                let sublist = form.addSublist({
                    id : 'custpage_sublistid',
                    type : serverWidget.SublistType.LIST,
                    label : 'Sublist'
                });
                sublist.addMarkAllButtons();

                sublist.addField({
                    id : 'custpage_checkbox',
                    type : serverWidget.FieldType.CHECKBOX,
                    label : 'Select'
                });

                sublist.addField({
                    id : 'custpage_customer',
                    type : serverWidget.FieldType.TEXT,
                    label : 'Customer'
                });

                sublist.addField({
                    id : 'custpage_internalid',
                    type : serverWidget.FieldType.INTEGER,
                    label : 'Internal ID'
                });

                sublist.addField({
                    id : 'custpage_trannumber',
                    type : serverWidget.FieldType.INTEGER,
                    label : 'Transaction Number'
                });

                var mySearch = search.create({
                    type: "salesorder",
                    filters:
                        [
                            ["mainline","is","T"],
                            "AND",
                            ["internalid","anyof","112","130","1","10","100","102","103","106","109","107","108","11"],
                            "AND",
                            ["type","anyof","SalesOrd"]
                        ],
                    columns:
                        [
                            search.createColumn({
                                name: "ordertype",
                                sort: search.Sort.ASC
                            }),
                            "tranid",
                            "entity"
                        ]
                });
                let lineCounter = 0;
                mySearch.run().each(function(result) {
                    let entity = result.getText({
                        name: 'entity'
                    });
                    let tranid = result.getValue('tranid');

                    let id = result.id;

                    sublist.setSublistValue({
                        id : 'custpage_customer',
                        line : lineCounter,
                        value : entity
                    })
                    sublist.setSublistValue({
                        id : 'custpage_internalid',
                        line : lineCounter,
                        value : id
                    })
                    sublist.setSublistValue({
                        id : 'custpage_trannumber',
                        line : lineCounter,
                        value : tranid
                    })


                    lineCounter++;
                    return true;
                });



                context.response.writePage({
                    pageObject: form
                });

            }else {
                log.debug("Request triggered in els", context.request.method);
                let myName = context.request.parameters.custpage_fname;
                log.debug("myName", myName);
                let serverRequest= context.request;

                let lineCount = serverRequest.getLineCount({
                    group: 'custpage_sublistid'
                });

                for(i=0; i<lineCount; i++){
                    let tranInternalId = serverRequest.getSublistValue({
                        group: 'custpage_sublistid',
                        name: 'custpage_internalid',
                        line: i
                    });
                    log.debug("tranInternalId", tranInternalId);
                }
                context.response.write({output: "<h1>Data Received</h1>"});
            }


        }
        return {onRequest}

    });
