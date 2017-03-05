import { expect } from 'chai';
import { AWSImage } from '../src/AWSImage'
import { ImageTemplate } from '../src/interfaces/image-interface';
import * as base64Img from 'base64-img';

describe('AWS DynamoDB Image Logic', () => {
    let awsInstance = new AWSImage();
    describe('get image', () => {
        it('retrieves image from AWS', (done) => {
            awsInstance.getImage("124", (status, getImageResponse) => {
                expect(status).to.equal(200);
                expect(getImageResponse.imageContent).to.equal("derrrr");
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

    describe('get image by user id', () => {
        it('retrieves all images from AWS by user id', (done) => {
            awsInstance.getThumbnails('123', (status, getImageResponse) => {
                expect(status).to.equal(200);
                getImageResponse.forEach(image => {
                    expect(image.userId).to.equal('123');
                });
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
                "imageContent": base64Img.base64Sync('./samples/pic2.jpg')
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

    describe('get users', () => {
        it('gets distinct list of userIds from AWS', (done) => {
            awsInstance.getUsers((status, getUsersResponse) => {
                let userSet = new Set<string>();
                expect(status).to.equal(200);
                expect(getUsersResponse).to.be.instanceof(Array);
                getUsersResponse.forEach((userId) => {
                    expect(userSet.has(userId)).to.be.false;
                    userSet.add(userId);
                });
                done();
            })
        })
    })      
});