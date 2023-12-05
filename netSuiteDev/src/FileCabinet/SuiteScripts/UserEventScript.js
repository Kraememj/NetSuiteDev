/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         */
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
        const beforeSubmit = (context) => {
            const thisRecord = context.newRecord;

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         */
        const afterSubmit = (context) => {

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
