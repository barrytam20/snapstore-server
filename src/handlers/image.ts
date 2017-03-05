'user strict';

import { ImageTemplate } from '../interfaces/image-interface';
import { AWSImage } from '../AWSImage';
import { slsResponse } from '../helper/slsResponse';

let awsImageInstance = new AWSImage();

module.exports.createImage = (event, context, callback) => {
    let params = event.body;
    console.log('create image params: ' + JSON.stringify(params));
    awsImageInstance.createImage(params, (status, createImageResponse) => {
        context.callbackWaitsForEmptyEventLoop = false;
        slsResponse(status, createImageResponse, callback);
    });
};

module.exports.getImage = (event, context, callback) => {
    let imageId = event.path.imageId;

    awsImageInstance.getImage(imageId, (status, getImageResponse) => {
        context.callbackWaitsForEmptyEventLoop = false;
        slsResponse(status, getImageResponse, callback);
    });
};

module.exports.getThumbnails = (event, context, callback) => {
    let userId = event.path.userId;

    awsImageInstance.getThumbnails(userId, (status, getImagesResponse) => {
        context.callbackWaitsForEmptyEventLoop = false;
        slsResponse(status, getImagesResponse, callback);
    });
};

module.exports.updateImage = (event, context, callback) => {
    let params = event.body;
    console.log('update user params: ' + JSON.stringify(params));
    awsImageInstance.updateImage(params, (status, updateImageResponse) => {
        context.callbackWaitsForEmptyEventLoop = false;
        slsResponse(status, updateImageResponse, callback);
    });
};

module.exports.deleteImage = (event, context, callback) => {
    let imageId = event.path.imageId;

    awsImageInstance.deleteImage(imageId, (status, deleteImageResponse) => {
        context.callbackWaitsForEmptyEventLoop = false;
        slsResponse(status, deleteImageResponse, callback);
    });
};

module.exports.getUsers = (event, context, callback) => {
    awsImageInstance.getUsers((status, getUsersResponse) => {
        context.callbackWaitsForEmptyEventLoop = false;
        slsResponse(status, getUsersResponse, callback);
    });
};