import * as AWS from 'aws-sdk';
import * as sharp from 'sharp';
import { ImageTemplate } from './interfaces/image-interface';


export class AWSImage {
    private docClient: AWS.DynamoDB.DocumentClient;

    constructor(){
        AWS.config.update([
            { region: "us-east-1" },
            { endpoint: "dynamodb.us-east-1.amazonaws.com"}
        ]);
        try{
            AWS.config.loadFromPath('config/awsConfig.json');
        } catch (err) {
            console.log(err);
        }
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    public getImage(imageId: string, callback: (status: number, response: any) => void){
        const params = {
            TableName: 'Images',
            Key:{
                imageId: imageId
            }
        };
        this.docClient.get(params, (err, data) => {
            if (err) {
                callback(500, err)
            } else if (!data.Item) {
                callback(404, { errorMessage: `${imageId} not found`});
            } else {
                callback(200, data.Item);
            }
        });  
    }

    public getThumbnails(userId: string, callback: (status: number, response: any) => void){
        const params = {
            TableName : "Images",
            FilterExpression: "userId = :userId",
            ExpressionAttributeValues: {
                ":userId":userId
            },
            ProjectionExpression: "imageId, postDate, thumbnail, userId"
        };   
        this.docClient.scan(params, (err, data) => {
            if (err) {
                callback(500, err)
            } else {
                callback(200, data.Items);
            }
        });          
    }    

    public createImage(image: ImageTemplate, callback: (status: number, resposne: any) => void){
        const thumbnailBuffer = new Buffer(image.imageContent.substring(22),'base64');
        sharp(thumbnailBuffer).resize(100).toBuffer()
            .then( thumbnail => {
                image.thumbnail = 'data:image/jpg;base64,' + thumbnail.toString('base64');
                const params = {
                    TableName: "Images",
                    Item: image
                };      
                this.docClient.put(params, (err, data) => {
                    if (err) {
                        callback(500, err);
                    } else {
                        callback(200, { 
                            imageId: image.imageId,
                            thumbnail: image.thumbnail
                        });
                    }
                });                  
            })
    }

    public updateImage(image: ImageTemplate, callback: (status: number, response: any) => void){
        let params = {
            TableName:"Images",
            Key:{
                imageId: image.imageId
            },
            UpdateExpression: "set userId = :userId, imageContent = :imageContent, postDate = :postDate",
            ExpressionAttributeValues:{
                ":userId": image.userId,
                ":imageContent": image.imageContent,
                ":postDate": image.postDate
            },
            ReturnValues:"UPDATED_NEW"            
        };
        if(image.locale){
            params.UpdateExpression += ", locale = :locale";
            params.ExpressionAttributeValues[':locale'] = image.locale;
        }
        if(image.caption){
            params.UpdateExpression += ", caption = :caption";
            params.ExpressionAttributeValues[':caption'] = image.caption;
        }      
        this.docClient.update(params, (err, data) => {
            if (err) {
                callback(500, err);
            } else {
                callback(200, data);
            }
        });    
    }

    public deleteImage(imageId: string, callback: (status: number, response: any) => void){
        const params = {
            TableName: 'Images',
            Key:{
                imageId: imageId
            }
        };
        this.docClient.delete(params, (err, data) => {
            if (err) {
                callback(500, err)
            } else {
                callback(200, {imageId: imageId});
            }
        });  
    }    
}