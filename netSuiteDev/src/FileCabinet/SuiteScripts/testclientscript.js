/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define(['N/record'], function(record) {

    function pageInit(context) {
        let thisRecord = context.currentRecord;
        // Internal ID and type
        let thisRecordInternalId = thisRecord.id;
        let thisRecordType = thisRecord.type;

        // Free-form text field - gets value
        let memo = thisRecord.getValue({
            fieldId: 'memo'
        })

        // Drop down record field - gives internal id of the drop down selection
        let customer = thisRecord.getValue({
            fieldId: 'entity'
        })

        // getText gives text
        let customerText = thisRecord.getText({
            fieldId: 'entity'
        })

        // Load customer
        let loadedCustomer = record.load({
            type: 'customer',
            id: customer
        })

        // get mobile Phone
        let customerMobilePhone =loadedCustomer.getValue({
            fieldId: 'mobilephone'
        })

        // thisRecord.setValue({
        //     fieldId: 'otherrefnum',
        //     value: 'HI'
        // })

        console.log('customerphone', customerMobilePhone)

        // let customerField = thisRecord.getField({fieldId: 'entity'})
        // customerField.isDisabled = true




    }

    // Our goal is to set the Memo field based on the PO number field. Whenever po
    // field is changed, we set the memo field
    function fieldChanged(context) {
        let fieldId = context.fieldId;
        let thisRecord = context.currentRecord;
        if (fieldId === 'otherrefnum'){
            let poNumber = thisRecord.getValue({
                fieldId: 'otherrefnum'
            })
            thisRecord.setValue({
                fieldId: 'memo',
                value: poNumber
            })

        }


    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged
    };
    
});
