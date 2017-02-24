var AWS = require("aws-sdk");
var fs = require('fs');
var base64Img = require('base64-img');
var sharp = require('sharp');

AWS.config.update({
    region: "us-east-1",
    endpoint: "dynamodb.us-east-1.amazonaws.com"
});

AWS.config.loadFromPath('../config/awsConfig.json');

var docClient = new AWS.DynamoDB.DocumentClient();

var allImages = [
    {"imageId":"123", "userId": "123", "postDate":1000000, "imageContent":"asdjfhasdfy9a8s7dfasdhfashdfa8798789"},
    {"imageId":"124", "userId": "777", "postDate":1000001, "imageContent":"asdfasdfasssssasdfasdhfashdfa8798789"}
]

function add(allImages){
    allImages.forEach(function(image) {
        var params = {
            TableName: "Images",
            Item: image
        };

        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add image", image.id, ". Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log('add item response: ' + JSON.stringify(data)); //response is {}
                console.log("PutItem succeeded:", image.imageId);
            }
        });
    });
}

function deleteImage(id){
        const params = {
            TableName: 'Images',
            Key:{
                imageId: id
            }
        };
        docClient.delete(params, (err, data) => {
            if (err) {
                console.log(500, err)
            } else {
                console.log(JSON.stringify(data));
                console.log('hey there');
            }
        });  
}

function get(id){

    var params = {
        TableName: 'Images',
        Key:{
            imageId: id
        }
    };
    docClient.get(params, function(err, data) {
        console.log('get data: ' + JSON.stringify(data));
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log('get item response: ' + JSON.stringify(data)); 
            //data = {"Item":{"date":1000000,"imageId":123,"data":"asdjfhasdfy9a8s7dfasdhfashdfa8798789","userId":123}}
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        }
    });    
}

function update(id, caption, locale){
    var params = {
        TableName:"Images",
        Key:{
            imageId: id
        },
        UpdateExpression: "set caption = :caption, locale = :locale",
        ExpressionAttributeValues:{
            ":caption":caption,
            ":locale": locale
        },
        ReturnValues:"UPDATED_NEW"
    };

    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data));
        }
    });
}

function addPic(){
    var id = Date.now();
    var fullData = base64Img.base64Sync('./pic2.jpg');
    fullData=Buffer.from(fullData.substring(22),'base64');
    sharp(fullData).resize(200).toBuffer()
        .then( data => {
                var params = {
                    TableName: "Images",
                    Item: {
                        imageId:  'testthumbnail2',
                        userId: '123',
                        imageContent:  fullData,
                        postDate: new Date(id),
                        thumbnail: 'data:image/jpg;base64,' + data.toString('base64')
                    }
                };
                docClient.put(params, function(err, data) {
                    if (err) {
                        console.error("Unable to add image", id, ". Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("PutItem succeeded:", id);
                    }
                });
        })
        .catch(err => console.log(`sharp error ${err}`));

}

function textToPic(){
    var data = fs.readFileSync('snap1.txt', 'utf8');
    var filepath = base64Img.imgSync(data, '', 'pic2');
}

function picToText(){
    var data = base64Img.base64Sync('pic1.jpg');
    fs.writeFileSync('snap1.txt',data);
}

function getByUser(userId){
    var params = {
        TableName : "Images",
        FilterExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId":userId
        },
        ProjectionExpression: "imageId, postDate, thumbnail"
    };

    docClient.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            console.log('data: ' + JSON.stringify(data));
        }
    });    
}

//add(allImages);
// getByUser("123");
// update("123",'test caption','Seattle');
// update(111,'test caption','Seattle');
// addPic();
// textToPic();
//picToText();
deleteImage("1486787125286");