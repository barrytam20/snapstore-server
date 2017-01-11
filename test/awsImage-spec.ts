import { expect } from 'chai';
import { AWSImage } from '../src/AWSImage'
import { ImageTemplate } from '../src/interfaces/image-interface';

describe('AWS DynamoDB Image Logic', () => {
    let awsInstance = new AWSImage();
    describe('get image', () => {
        it('retrieves image from AWS', (done) => {
            awsInstance.getImage("124", (status, getImageResponse) => {
                expect(status).to.equal(200);
                expect(getImageResponse.imageContent).to.equal("asdfasdfasssssasdfasdhfashdfa8798789");
                done();
            });
        });
        it('throws 404 when imageId is not found', (done) => {
            awsInstance.getImage("nonexistentid", (status, getImageResponse) => {
                expect(status).to.equal(404);
                done();
            });            
        });
    });

    describe('create image', () => {
        it('successfully posts image to AWS', (done) => {
            let image: ImageTemplate = {
                "imageId": "testImageId", 
                "userId": "testUser", 
                "postDate": 1000001, 
                "imageContent": "testimagedata"
            };
            awsInstance.createImage(image, (status, postImageResponse) => {
                expect(postImageResponse.imageId).to.equal("testImageId");
                expect(status).to.equal(200);
                done();
            });
        })
    });

    describe('update image', () => {
        it('successfully updates image in AWS', (done) => {
            let image: ImageTemplate = {
                "imageId": "testImageId", 
                "userId": "testUser", 
                "postDate": 1000001, 
                "imageContent": "testimagedata",
                "caption": "unit test caption",
                "locale": "seattle"
            }
            awsInstance.updateImage(image, (status, updateImageResponse) => {
                expect(status).to.equal(200);
                done();
            });
        });    
    });    

    describe('delete image', () => {
        it('successfully deletes image from AWS', (done) => {
            awsInstance.deleteImage("testImageId", (status, deleteResponse) => {
                expect(status).to.equal(200);
                done();
            });
        });           
    });        
});