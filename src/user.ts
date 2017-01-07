'use strict';

import { UserResponse } from './interfaces/user-interface'

export class User{
    private userId: string;
    private firstName: string;
    private lastName: string;
    private email: string;

    constructor(userId: string, firstName: string, lastName: string, email: string){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    
}