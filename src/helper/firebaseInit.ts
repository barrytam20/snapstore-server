'use strict';
import * as admin from 'firebase-admin';

var serviceAccount = require('json-loader!../../config/serviceAccount.json');

export class FB {
    private static fbInstance;

    static initFirebase (name: string){
        if(!this.fbInstance){
            console.log('initializing firebase');
            this.fbInstance = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: 'https://snapstore-2f947.firebaseio.com/'
            })
        }
        return this.fbInstance;
    }
}