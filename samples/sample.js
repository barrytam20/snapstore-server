var AWS = require("aws-sdk");
var fs = require('fs');
var base64Img = require('base64-img');

AWS.config.update({
    region: "us-east-1",
    endpoint: "dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var allImages = [
    {"id":123, "date":1000000, "data":"asdjfhasdfy9a8s7dfasdhfashdfa8798789"},
    {"id":124, "date":1000001, "data":"asdfasdfasssssasdfasdhfashdfa8798789"}
]

function add(allImages){
    allImages.forEach(function(image) {
        var params = {
            TableName: "Images",
            Item: {
                "id":  image.id,
                "date": image.date,
                "data":  image.data
            }
        };

        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add image", image.id, ". Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("PutItem succeeded:", image.id);
            }
        });
    });
}

function get(id){

    var params = {
        TableName: 'Images',
        Key:{
            id: id
        }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        }
    });    
}

function update(id, note, locale){
    var params = {
        TableName:"Images",
        Key:{
            id: id
        },
        UpdateExpression: "set note = :note, locale = :locale",
        ExpressionAttributeValues:{
            ":note":note,
            ":locale": locale
        },
        ReturnValues:"UPDATED_NEW"
    };

    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}

function addPic(){
    var id = Date.now();
    var data = fs.readFileSync('snap1.txt', 'utf8');
    var params = {
        TableName: "Images",
        Item: {
            "id":  id,
            "data":  data
        }
    };
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add image", id, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", id);
        }
    });
}

function textToPic(){
    var data = fs.readFileSync('snap1.txt', 'utf8');
    var filepath = base64Img.imgSync(data, '', 'pic1');
}

function picToText(){
    var data = base64Img.base64Sync('pic1.jpg');
    fs.writeFileSync('snap1.txt',data);
}

//add(allImages);
//get(123);
//update(1231,'test note','Seattle');
//addPic();
textToPic();
//picToText();
