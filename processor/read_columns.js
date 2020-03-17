//JavaScript - read_columns.js

var fs = require('fs');
const { PerformanceObserver, performance } = require('perf_hooks');
const lineReader = require('line-reader');
var readline = require('readline');
var stream = require('stream');

const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

function start(callback) {
    var count = 0;
    var offset = 0;
    var limit = 3000000;
    var table = "author";
    var batch = [];
    var instream = fs.createReadStream("./data/" + table + ".tsv");
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);

    var t0 = performance.now();
    rl.on('line', function(line) {
        if (count > offset && count < offset + limit) { return }
        var split = line.split('\t');
        var id = split[1].split("/")[2];
        var json = split[4];
        var item = new Object();
        item[id] = { 'S': json }
        batch.push(item);
        if (batch.length % 100000 == 0) { console.log(batch.length) }
        count += 1;
    });

    rl.on('close', function() {
        var t1 = performance.now();
        console.log("Call to write table data " + table + " took " + (t1 - t0) + " milliseconds.");
        callback(batch);
    });
}

start(function (keys) {
    console.log(keys.length);
});

function batchWrite(table, keys) {
    var client = new AWS.DynamoDB();
    var items = new Object();
    items[table] = { "Keys": keys};
    var params = {
        RequestItems: items
    }
    console.log(params);
    client.batchGetItem(params, function(err, data) {
        if (err) {
            console.log(err);
            console.log(keys);
        } else {
            data.Responses.TABLE_NAME.forEach(function(element, index, array) {
                console.log(element);
            });
        }
    });
}

function write(table, id, json) {
    var dynamodb = new AWS.DynamoDB();
    var params = {
        TableName : table,
        Item : {
            'id' : {S: id},
            'data' : {S: json}
        }
    }
    dynamodb.putItem(params, function(err, data) {
        if (err) {
            console.log("Error", err);
            console.log("Error Data", json);
        }
    })
}

function create(table) {
    var dynamodb = new AWS.DynamoDB();
    var params = {
        TableName : table,
        KeySchema: [
            { AttributeName: "id", KeyType: "HASH" },
        ],
        AttributeDefinitions: [
            { AttributeName: "id", AttributeType: "S" },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };
    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}