'user strict';

import { UserTemplate } from '../interfaces/user-interface';
import { User } from '../firebaseUser';
import { slsResponse } from '../slsResponse';

let user = new User();

module.exports.createUser = (event, context, callback) => {
    let params = event.body;
    console.log('create user params: ' + JSON.stringify(params));
    user.createUser(params, (status, postUserResponse) => {
        context.callbackWaitsForEmptyEventLoop = false;
        slsResponse(status, postUserResponse, callback);
    });
};

module.exports.getUser = (event, context, callback) => {
    let userId = event.path.userId;

    user.getUser(userId, (status, getUserResponse) => {
        context.callbackWaitsForEmptyEventLoop = false;
        slsResponse(status, getUserResponse, callback);
    });
};

module.exports.findUserByEmail = (event, context, callback) => {
    let email = event.path.email;

    user.findUserByEmail(email, (status, getUserResponse) => {
        context.callbackWaitsForEmptyEventLoop = false;
        slsResponse(status, getUserResponse, callback);
    });
};

module.exports.updateUser = (event, context, callback) => {
    let userId = event.path.user_id;
    let params = event.body;
    console.log('update user params: ' + JSON.stringify(params));
    user.updateUser(userId, params, (status, updateUserResponse) => {
        context.callbackWaitsForEmptyEventLoop = false;
        slsResponse(status, updateUserResponse, callback);
    });
};