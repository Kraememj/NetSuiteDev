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
        // check the December 2023 SO checkbox and disable the field by default.
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
            // specific customer ID is 32
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
        // When a line is selected or added at the item level, we would automatically
        // want the description field to be populated with the text “FOR SALE ITEM”.
        thisRecord.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'description',
            value: "FOR SALE ITEM"
        });
    }

    /**
     * Validation function to be executed when field is changed.
     */
    function validateField(context) {
    return true
    }

    /**
     * Validation function to be executed when sublist line is committed.
     */
    function validateLine(context) {
        const thisRecord= context.currentRecord
        // If a user tries to commit a line at the line level without the Item Note field,
        // do not allow them to populate and display an alert that says “Item Note Required!”.
        const message = "Item Note Required!";
        const sublistValue = thisRecord.getCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'custcol_ns_pos_itemnote'
        });
        console.log('sublistValue',sublistValue)
        if (!sublistValue){
            alert(message)
            return false
        }

        console.log("note required")
        return true;
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
        fieldChanged: fieldChanged,
        validateLine: validateLine
    };
    
});
