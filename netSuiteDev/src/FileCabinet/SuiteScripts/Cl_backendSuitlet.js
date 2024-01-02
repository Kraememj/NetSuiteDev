/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/https', 'N/ui/dialog', 'N/url'],
/**
 * @param{https} https
 * @param{dialog} dialog
 * @param{url} url
 */
function(https, dialog, url) {

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} context
     * @param {Record} context.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    function saveRecord(context) {
        try{
            let thisRecord = context.currentRecord;
            let comments = thisRecord.getValue({fieldId: 'comments'});
            log.debug('comments',comments)
            // Call suitelet and pass comments
            let suiteletUrl = url.resolveScript({
                scriptId: 'customscript_sl_backend',
                deploymentId: 'customdeploy_sl_backend'
            });
            log.debug('url',suiteletUrl)
            let response = https.post({url: suiteletUrl, body: comments});
            log.debug("response", response)
            log.debug("response", JSON.stringify(response))

            // Don't allow user to save if comments are empty
            if (response.body === 'F'){
                dialog.alert({
                    title: 'Warning',
                    message: 'Comments are empty, please fill the comments'
                })
                return false
            }
            return true
        }catch (e){
            log.error("Error in CL SaveRes", e.toString())
        }
    }

    return {
        saveRecord: saveRecord
    };
    
});
