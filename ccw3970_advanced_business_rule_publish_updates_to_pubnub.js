/*
 Advanced Business Rule Script to publish message to PubNub Service Using RESTMessageV2 API to issue HTTP Request
 Publish message containing select subset of fields from the incident record that has been updated or inserted
 */
(function executeBusinessRule() {
    try {
        var instanceName = gs.getProperty('instance_name');
        var req = new sn_ws.RESTMessageV2('PubNub', 'Publish Message');
        req.setStringParameterNoEscape('pub_key', 'pub-c-11b9ede6-f9ee-4da8-a829-944a45f29eb8');
        req.setStringParameterNoEscape('client', instanceName);
        req.setStringParameterNoEscape('sub_key', 'sub-c-dafe9b8c-1ae1-11e7-bc52-02ee2ddab7fe');
        req.setStringParameterNoEscape('channel', 'CCW3970_' + instanceName);

        //  Build a data transfer object representing the incident record to be sent as JSON to PubNub
        var DTOIncident = {
            'assigned_to': current.getDisplayValue('assigned_to'),   
            'category': current.getValue('category'),
            'created_on': current.getValue('sys_created_on'),
            'number': current.getValue('number'),
            'priority': current.getDisplayValue('priority'),
            'state': current.getDisplayValue('state'),
            'sys_id': current.getValue('sys_id'),
            'updated_by': current.getValue('sys_updated_by'),
            'updated_on': current.getValue('sys_updated_on'),
            'caller_id': current.getDisplayValue('caller_id'),
            'active': current.getValue('active')
        };

        //  Convert DTO to JSON string
        var body = JSON.stringify(DTOIncident);
        req.setRequestBody(body);


        //  Execute request
        var res = req.execute();
        var responseBody = res.getBody();
        var httpStatus = res.getStatusCode();
        gs.debug(httpStatus);
    }
    catch (ex) {
        var message = ex.getMessage();
        gs.debug(message);
    }
})();
