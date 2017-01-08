'use strict';
import * as crypto from 'crypto';

export class Auth {
    private token: string;
    private userId: string;
    constructor(userId: string) {
        this.token = 'Bearer ' + crypto.randomBytes(64).toString('hex');
        this.userId = userId;
    }
}
