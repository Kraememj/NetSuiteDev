/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'],
    /**
 * @param{serverWidget} serverWidget
 */
    (serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} context
         * @param {ServerRequest} context.request - Incoming request
         * @param {ServerResponse} context.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (context) => {
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
                type : serverWidget.FieldType.SELECT,
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


            context.response.writePage({
                pageObject: form
            });


        }
        return {onRequest}

    });
