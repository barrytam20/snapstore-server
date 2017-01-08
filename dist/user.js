'use strict';
var User = (function () {
    function User(userId, firstName, lastName, email) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
    User.prototype.setFirstName = function (firstName) {
        this.firstName = firstName;
    };
    User.prototype.setLastName = function (lastName) {
        this.lastName = lastName;
    };
    User.prototype.setEmail = function (email) {
        this.email = email;
    };
    User.prototype.getUser = function () {
        var response = {
            userId: this.userId,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
        };
        return response;
    };
    return User;
}());
exports.User = User;
