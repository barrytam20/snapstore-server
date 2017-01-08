'use strict';
var base64Img = require("base64-img");
var Image = (function () {
    function Image(userId, path) {
        this.userId = userId;
        this.imageId = "I" + Date.now();
        if (path) {
            this.data = base64Img.base64Sync('pic1.jpg');
        }
    }
    Image.prototype.setLocale = function (locale) {
        this.locale = locale;
    };
    Image.prototype.setDate = function (date) {
        this.date = date;
    };
    Image.prototype.getImage = function () {
        var response = {
            imageId: this.imageId,
            userId: this.userId,
            data: this.data,
            locale: this.locale,
            date: this.date
        };
        return response;
    };
    return Image;
}());
exports.Image = Image;
