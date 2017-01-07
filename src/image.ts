'use strict';

import * as base64Img from 'base64-img';
import {ImageResponse} from './interfaces/image-interface';

export class Image{
    private imageId: string;
    private userId: string;
    private data: string;
    private locale: string;
    private date: number;

    constructor(userId: string, path?: string){
        this.userId = userId;
        this.imageId = `I${Date.now()}`;
        if(path){
            this.data = base64Img.base64Sync('pic1.jpg');
        }
    }

    public setLocale (locale: string): void {
        this.locale = locale;
    }

    public setDate ( date: number): void {
        this.date = date;
    }

    public getImage(): ImageResponse{
        let response: ImageResponse = {
            imageId: this.imageId,
            userId: this.userId,
            data: this.data,
            locale: this.locale,
            date: this.date
        };
        return response;
    } 

}