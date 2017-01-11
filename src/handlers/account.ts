'use strict';

import * as email_validator from 'email-validator';
import { Account } from '../firebaseAccount';
import { slsResponse } from '../helper/slsResponse';

let account = new Account();

module.exports.login = (event, context, callback) => {
    let params = event.body;
    if (!params || !email_validator.validate(params.email)) {
        let errResponse = {
            body: 'invalid login params',
            error: ''
        };
        errResponse.error = (!params) ? 'missing body' : 'invalid email';
        slsResponse(400, errResponse, callback);
    }

    account.login(params.email, params.password, (status, loginResponse) => {
        context.callbackWaitsForEmptyEventLoop = false;
        slsResponse(status, loginResponse, callback);
    });
};

module.exports.register = (event, context, callback) => {
    let params = event.body;
    if (!params || !email_validator.validate(params.email)) {
        let errResponse = {
            body: 'invalid login params',
            error: ''
        };
        errResponse.error = (!params) ? 'missing body' : 'invalid email';
        slsResponse(400, errResponse, callback);
    }
    account.register(params, (status, registerResponse) => {
        context.callbackWaitsForEmptyEventLoop = false;
        slsResponse(status, registerResponse, callback);
    });
};

module.exports.delete = (event, context, callback) => {
    let userId = event.path.userId;
    account.register(userId, (status, deleteAccountResponse) => {
        context.callbackWaitsForEmptyEventLoop = false;
        slsResponse(status, deleteAccountResponse, callback);
    });
};
