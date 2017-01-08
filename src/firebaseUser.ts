'use strict';

import * as firebase from 'firebase';
import { FB } from './fbHelper/init'
import { UserTemplate } from './interfaces/user-interface'

export class User {
    private fbInstance: firebase.app.App;
    private userRef: firebase.database.Reference;

    constructor() {
        this.fbInstance = FB.initFirebase('user');
        this.userRef = this.fbInstance.database().ref('/user');
    }

    public createUser(userData: UserTemplate, callback: (status: number, response: any) => void) {
        console.log(JSON.stringify(userData));
        this.findUserByEmailHelper(userData.email, (userId: string) => {
            if (userId === null) {
                let newUser: firebase.database.ThenableReference = this.userRef.push();
                newUser.set(userData).then(() => {
                    console.log('SUCCESS, User created: ' + newUser.key);
                    callback(200, { user_id: newUser.key });
                }).catch((error) => {
                    console.log('ERROR, Adding user : ' + error);
                    callback(500, null);
                });
            } else {
                console.log('ERROR: User already exists with email');
                callback(403, {"userId": userId, "message": "user already exists"});
            }
        });
    
    }

    public getUser(userId: string, callback: (status: number, response: any) => void) {
        let childUserRef = this.userRef.child(userId);
        childUserRef.once('value', (snapshot: firebase.database.DataSnapshot) => {
            if (snapshot.exists()) {
                console.log('SUCCESS: Get user: ' + userId);
                let user = snapshot.val();
                user.user_id = userId;
                callback(200, user);
            } else {
                console.log('SUCCESS: Get user, no match: ' + userId);
                callback(404, userId + ' not found');
            }
        });
    }

    public findUserByEmail(email: string, callback: (status: number, response: any) => void) {
        this.findUserByEmailHelper(email, (userId) => {
            if (!userId) {
                callback(404, console.log('ERROR: Account not found for phone: ' + email));
            } else {
                let singleUserRef = this.userRef.child(userId);
                singleUserRef.once('value', (snapshot: firebase.database.DataSnapshot) => {
                    if (snapshot.exists()) {
                        let data = snapshot.val();
                        data.user_id = userId;
                        callback(200, data);
                    } else {
                        callback(500, console.log('ERROR, Retrieving user for: ' + userId));
                    }
                });
            }
        });
    }

    public updateUser(userId: string, userData: UserTemplate, callback: (status: number, response: any) => void) {
        let childUserRef = this.userRef.child(userId);
        childUserRef.once('value', (snapshot: firebase.database.DataSnapshot) => {
            if (snapshot.exists()) {
                childUserRef.update(userData).then(() => {
                    callback(200, console.log('SUCCESS: Update user: ' + userId));
                }).catch((error) => {
                    callback(500, console.log('ERROR, Update user: ' + error));
                });
            } else {
                console.log('SUCCESS: Update user, no match: ' + userId);
                callback(200, null);
            }
        });
    }    

    private findUserByEmailHelper(email: string, callback: (userId: string) => void) {
        let singleUserRef = this.userRef.orderByChild('number').equalTo(email);
        singleUserRef.once('value', (snapshot: firebase.database.DataSnapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((item) => {
                    console.log('Account found account for phone: ' + email);
                    callback(item.key);
                    return true; // Cancels further enumeration
                });
            } else {
                console.log('Account DNE for phone: ' + email);
                callback(null);
            }
        });
    }
}