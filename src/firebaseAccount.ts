'use strict';

import * as firebase from 'firebase';
import { FB } from './helper/firebaseInit';
import { Token } from './helper/auth';
import { User } from './firebaseUser';
import { UserTemplate } from './interfaces/user-interface'

export class Account {
    private _fb_instance: firebase.app.App;
    private _account_ref: firebase.database.Reference;
    private user: User;

    constructor() {
        this._fb_instance = FB.initFirebase('account');
        this._account_ref = this._fb_instance.database().ref('/account');
        this.user = new User();
    }


    public login(email: string, password: string, callback: (status: number, response: any) => void) {
        this.findUser(email, (userId) => {
            if (!userId) {
                callback(404, { errorMessage: 'ERROR: Account not found for email: ' + email });
            } else {
                let singleAccountRef = this._account_ref.child(userId);
                singleAccountRef.once('value', (snapshot: firebase.database.DataSnapshot) => {
                    if (snapshot.exists()) {
                        // TODO input response into template and validate password exists 
                        if (password !== snapshot.val().password) {
                            callback(403, { errorMessage: 'ERROR, Incorrect Password for email: ' + email });
                        } else {
                            let token = new Token(snapshot.val().user_id);
                            console.log('Success, Authenticating user with email: ' + email);
                            callback(200, { token: token});
                        }
                    } else {
                        callback(500, { errorMessage: 'ERROR, Retrieving account for: ' + userId });
                    }
                });
            }
        });
    }

    public register(userData: UserTemplate, callback: (status: number, response: any) => void) {
        this.findUser(userData.email, (userId) => {
            if (!userId) {
                this.user.createUser(userData, (status, createUserResponse) => {
                    if (status !== 200) {
                        callback(status, { errorMessage: 'Error, Could not Create user' });
                    } else {
                        let newAccount: firebase.database.ThenableReference = this._account_ref.push();
                        let newAccountTemplate = {
                            email: userData.email,
                            password: userData.password,
                            user_id: createUserResponse
                        };
                        newAccount.set(newAccountTemplate).then(() => {
                            callback(200, { key: newAccount.key });
                        }).catch((error) => {
                            callback(500, { errorMessage: `Error, Adding account : ${error}`});
                        });
                    }
                });
            } else {
                callback(400, console.log(`ERROR: Account already exists for email: ' + ${userData.email}`));
            }
        });
    }


    public deleteAccount(userId: string, callback: (status: number, response: any) => void) {
        let childAccountRef = this._account_ref.child(userId);
        childAccountRef.once('value', (snapshot: firebase.database.DataSnapshot) => {
            if (snapshot.exists()) {
                childAccountRef.remove().then(() => {
                    callback(200, { message: `SUCCESS: Delete account: ${userId}`});
                }).catch((error) => {
                callback(500, { errorMessage: `ERROR, Delete account:  ${error}` } );
                });
            } else {
                callback(200, {  message: `Delete user, no match: ${userId}`});
            }
        });
    }

    private findUser(email: string, callback: (userId: string) => void) {
        let singleAccountRef = this._account_ref.orderByChild('email').equalTo(email);
        singleAccountRef.once('value', (snapshot: firebase.database.DataSnapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((item) => {
                    console.log(`Account found account for email: ${email}`);
                    callback(item.key);
                    return true; // Cancels further enumeration
                });
            } else {
                console.log(`Account DNE for email: ${email}`);
                callback(null);
            }
        });
    }
}
