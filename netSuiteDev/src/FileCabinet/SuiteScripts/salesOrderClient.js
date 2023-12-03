/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define(['N/record'],
/**
 * @param{record} record
 */
function(record) {
    
    /**
     * Function to be executed after page is initialized.
     */
    function pageInit(context) {
        let thisRecord = context.currentRecord;
        // check the December 2023 SO checkbox and disable the field.
        const myRecordField = thisRecord.getField({
           fieldId:"custbody_dec2023_so"
        });
        thisRecord.setValue({
            fieldId:"custbody_dec2023_so",
            value: true
        })
        myRecordField.isDisabled = true

    }


    /**
     * Function to be executed when field is changed.
     */
    function fieldChanged(context) {
        const fieldId = context.fieldId;
        if (fieldId === 'entity'){
            const thisRecord = context.currentRecord;
            // Check the customer data on the record, if it is the customer 10 SDG Demo then disable the memo field.
            const customerValue = thisRecord.getValue({
                fieldId:"entity",
            })
            console.log('customerValue',customerValue)
            const memo = thisRecord.getField({
                fieldId:"memo"
            })
            if (customerValue === "32"){
                memo.isDisabled = true
            }
            else {
                memo.isDisabled = false
            }

        }
        return true


    }

    /**
     * Function to be executed when field is slaved.
     */
    function postSourcing(context) {

    }

    /**
     * Function to be executed after sublist is inserted, removed, or edited.
     */
    function sublistChanged(context) {

    }

    /**
     * Function to be executed after line is selected.
     */
    function lineInit(context) {
        const thisRecord = context.currentRecord
        let message = "Item Note Required!";
        let itemNote = thisRecord.getValue({
                fieldId:"custcol_ns_pos_itemnote"
            });
            alert(message);
        let lineSelect = thisRecord.getValue(
            {
                "fieldId":"item_display"
            }
        )
            let description = thisRecord.getValue(
                {
                    "fieldId":"description"
                }
            )
            // let des = "FOR SALE ITEM"
            if (lineSelect){
            description = "FOR SALE ITEM"
            }
    }

    /**
     * Validation function to be executed when field is changed.
     */
    function validateField(context) {

    }

    /**
     * Validation function to be executed when sublist line is committed.
     */
    function validateLine(context) {

    }

    /**
     * Validation function to be executed when sublist line is inserted.
     */
    function validateInsert(context) {

    }

    /**
     * Validation function to be executed when record is deleted.
     */
    function validateDelete(context) {

    }

    /**
     * Validation function to be executed when record is saved.
     */
    function saveRecord(context) {

    }

    return {
        pageInit: pageInit,
        lineInit: lineInit,
        fieldChanged: fieldChanged
    };
    
});
