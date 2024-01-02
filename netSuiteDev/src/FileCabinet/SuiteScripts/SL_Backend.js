/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define([],
    
    () => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {ServerRequest} context.request - Incoming request
         * @param {ServerResponse} context.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (context) => {
            let request = context.request;
            let response = context.response;

            if (request.method === "POST"){
                let comments = request.body;
                log.debug("comments", comments)
                log.debug({title: "comments", details: comments});
                if (comments == null || comments === ''){
                    log.debug({title: "response value", details: 'F'});
                }else {
                    log.debug({title: 'response value', details: 'T'});
                    response.write('T')
                }
            }
        }

        return {onRequest}

    });
