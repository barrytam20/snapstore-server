'use strict';

import { UserTemplate } from './interfaces/user-interface'

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

    public setFirstName(firstName: string): void{
        this.firstName = firstName;
    }

    public setLastName(lastName: string): void{
        this.lastName = lastName;
    }

    public setEmail(email: string): void{
        this.email = email;
    }    

    public getUser(): UserTemplate{
         let response: UserTemplate = {
             userId: this.userId,
             firstName: this.firstName,
             lastName: this.lastName,
             email: this.email,
         };
         return response;
    }
}