var AWS = require('aws-sdk');

var dynamodbConfig = {
	'endpoint': new AWS.Endpoint('http://localhost:8000'),
	'accessKeyId': 'placeholderKeyIdForLocalDB',
	'secretAccessKey': 'placeholderSecretAccessKeyForLocalDB',
	'region': 'us-west-1'
};

var dynamoDB = new AWS.DynamoDB(dynamodbConfig);
var unmarshalItem = require('dynamodb-marshaler').unmarshalItem;
var usersArray = [];

var params = {
    TableName: 'users',
    ExpressionAttributeNames:{
        '#fc': 'favoriteColor'
    },
    ExpressionAttributeValues: {
        ':c': { 'S': 'blue' }
    },
    FilterExpression: '#fc = :c'
};

dynamoDB.scan(params, function(err, data) {
    if ( err ) {
        console.log(err);
    }
    else {
        data.Items.forEach( function( item ) {
            usersArray.push(unmarshalItem(item));
        });
        console.log( usersArray );
    }
});

/* The result we get now looks like this:

[ { isAwesome: true, user: 'Baby Zeppelin', favoriteColor: 'blue' },
  { isAwesome: true, user: 'Zeppelin', favoriteColor: 'blue' } ]

  */
