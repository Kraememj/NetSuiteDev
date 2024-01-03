/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/runtime'],
    /**
 * @param{runtime} runtime
 */
    (runtime) => {
        /**
         * Defines the Suite script trigger point.
         * @param {Object} context
         * @param {ServerRequest} context.request - Incoming request
         * @param {ServerResponse} context.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (context) => {

            if (context.request.method === 'GET'){
                try{
                //All runtime properties
                    log.debug("Runtime", "***** Runtime Properties *****");

                //  Get the execution context of the script
                    let executionContext = runtime.executionContext;
                    log.debug("execution context of the script", executionContext);

                //  Get the feature availability of NEtSuite
                    let featureInEffect = runtime.isFeatureInEffect({
                        feature: 'ADVBILLING'
                    });
                    log.debug('Advanced Billing feature is enabled: ' + featureInEffect);

                //  Get the account ID
                    let accountId = runtime.accountId
                    log.debug('Account ID for the current user: ' + accountId);
                //  Get the country of account
                    let country = runtime.country
                    log.debug("country of account", country)

                //  Get the environment type
                    let envType = runtime.envType
                    log.debug("environment type", envType)

                //  GEt the processor Count
                    let processorCount = runtime.processorCount
                    log.debug("processor Count", processorCount);

                //  Get the number of queues
                    let queueCount = runtime.queueCount
                    log.debug("queue Count", queueCount);

                //  Get the version
                    let version = runtime.version
                    log.debug("version", version)

                //  Get Context Type
                    let ContextType = runtime.ContextType
                    log.debug("Context Type", ContextType)

                //  Get Environment Type
                    let EnvType = runtime.EnvType
                    log.debug("Environment Type", EnvType )


                //  Get the current user object properties
                    let user = runtime.getCurrentUser();

                //  Use the user object to get information about the user
                    let userId = user.id;
                    let userName = user.name;
                    let userEmail = user.email;
                    let userRoleId = user.roleId;
                    let userRole = user.role;
                    let userDepartment = user.department;
                    let userLocation = user.location;
                    let userContact = user.contact;
                    let userSubsidiary = user.subsidiary;
                    let userRoleCenter = user.roleCenter;

                //  Use the User object to get permission and preference information
                    let permission = user.getPermission({
                        name: 'ADMI_ACCOUNTING'
                    });

                    let userPref = user.getPreference ({
                        name: 'LANGUAGE'
                    });

                    log.debug({
                        title: 'User Information',
                        details: {
                            userId: userId,
                            userName: userName,
                            userRole: userRole,
                            userRoleId: userRoleId,
                            userDepartment: userDepartment,
                            userLocation: userLocation,
                            userContact: userContact,
                            userSubsidiary: userSubsidiary,
                            userRoleCenter: userRoleCenter

                        }
                    });

                    let script = runtime.getCurrentScript();
                    let paramValue = script.getParameter({
                        name: 'custscript_my_parameter'
                    });




                        }catch (e) {
                            log.error("error in script", e);
                }



                }

            }




        return {onRequest}

    });
