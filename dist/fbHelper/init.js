'use strict';
var admin = require("firebase-admin");
var serviceAccount = require('./serviceAccount.json');
var Firebase = (function () {
    function Firebase() {
    }
    Firebase.initFirebase = function (name) {
        if (!this.fbInstance) {
            console.log('initializing firebase');
            this.fbInstance = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: 'https://snapstore-2f947.firebaseio.com/'
            });
        }
        return this.fbInstance;
    };
    return Firebase;
}());
exports.Firebase = Firebase;
