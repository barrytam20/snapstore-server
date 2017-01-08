'use strict';
var crypto = require("crypto");
var Auth = (function () {
    function Auth(userId) {
        this.token = 'Bearer ' + crypto.randomBytes(64).toString('hex');
        this.userId = userId;
    }
    return Auth;
}());
exports.Auth = Auth;
