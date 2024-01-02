/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record'],

    (record) => {
            /**
             * Defines the function that is executed when a GET request is sent to a RESTlet.
             * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
             *     content types)
             * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
             *     Object when request Content-Type is 'application/json' or 'application/xml'
             * @since 2015.2
             */
            const get = (requestParams) => {
                log.debug('GET request triggered', JSON.stringify(requestParams))

                // Name Obj Record something better, like loadedCustomer or customerObj

                let objRecord = record.load({
                    type: record.Type.CUSTOMER,
                    id: requestParams.customerid,
                    isDynamic: true,
                });


                return objRecord
            }

            /**
             * Defines the function that is executed when a PUT request is sent to a RESTlet.
             * @param {string | Object} requestBody - The HTTP request body; request body are passed as a string when request
             *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
             *     the body must be a valid JSON)
             * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
             *     Object when request Content-Type is 'application/json' or 'application/xml'
             * @since 2015.2
             */
            const put = (requestBody) => {

                //Update
                log.debug("PUT Request Triggerd", JSON.stringify(requestBody));
                // We can use .submitFields only when we have existed fields
                // So we created field on the POST function, and now we would like to updated
                let id = record.submitFields({
                    type: record.Type.CUSTOMER,
                    id: requestBody.customerid,
                    values: {
                            "comments": "Sweet Restlet"
                    },
                    options: {
                        enableSourcing: false,
                        ignoreMandatoryFields : true
                    }
                });
                return {
                    "status": "Success",
                    "Message": "Successfully Updated the customer with id:" + id
                }

            }

            /**
             * Defines the function that is executed when a POST request is sent to a RESTlet.
             * @param {string | Object} requestBody - The HTTP request body; request body is passed as a string when request
             *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
             *     the body must be a valid JSON)
             * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
             *     Object when request Content-Type is 'application/json' or 'application/xml'
             * @since 2015.2
             */
            const post = (requestBody) => {
                //Create
                log.debug("POST Triggered", JSON.stringify(requestBody));
                const name = requestBody.name;
                const subsidiary = requestBody.subsidiary;
                const recordType = requestBody.recordType


                try {
                    if (!recordType){
                        return JSON.stringify({
                            status: 500,
                            message: 'Missing Record Type value. Record Type is required.'
                        })
                    }
                    let objRecord = record.create({
                            type: recordType
                    });

                    if (!name){
                        return JSON.stringify({
                            status: 500,
                            message: 'Missing name value. Name is required.'
                        })
                    }


                    objRecord.setValue({
                            fieldId: 'companyname',
                            value: name
                    });

                    if (!subsidiary){
                        return JSON.stringify({
                            status: 500,
                            message: 'Missing subsidiary value. Subsidiary is required.'
                        })

                    }

                    objRecord.setValue({
                        fieldId: 'subsidiary',
                        value: subsidiary
                    });

                    let id = objRecord.save();
                    return JSON.stringify({
                        status: 200,
                        id:id,
                        message: 'Created successfully'
                    })

                }catch(e){
                    return JSON.stringify({
                        status: 500,
                        message: `Could not create ${recordType}` + e.message
                    })

                }



            }

            /**
             * Defines the function that is executed when a DELETE request is sent to a RESTlet.
             * @param {Object} requestParams - Parameters from HTTP request URL; parameters are passed as an Object (for all supported
             *     content types)
             * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
             *     Object when request Content-Type is 'application/json' or 'application/xml'
             * @since 2015.2
             */
            const doDelete = (requestParams) => {
                log.debug("DELETE Request Triggered", JSON.stringify(requestParams))

                let id = record.delete({
                    type: requestParams.recordType,
                    id: requestParams.id,
                });
                return {
                    "status": "Success",
                    "Message": "Successfully Deleted the customer with id:" + id
                }

            }

            return {get, put, post, delete: doDelete}

    });
