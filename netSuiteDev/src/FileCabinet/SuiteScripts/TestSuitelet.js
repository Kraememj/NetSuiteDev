/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define([], () => {
        const onRequest = (context) => {
            const params = context.request.parameters;
            const salesOrderId = params.salesOrderId

            context.response.write({output: `<h1>Sales order Id: ${salesOrderId} </h1>`});

        }

        return {onRequest}

    });
