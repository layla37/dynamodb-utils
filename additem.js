var AWS = require('aws-sdk');

var dynamodbConfig = {
	'endpoint': new AWS.Endpoint('http://localhost:8000'),
	'accessKeyId': 'placeholderKeyIdForLocalDB',
	'secretAccessKey': 'placeholderSecretAccessKeyForLocalDB',
	'region': 'us-west-1'
};

var dynamoDB = new AWS.DynamoDB(dynamodbConfig);

dynamoDB.putItem( { TableName: 'users', Item: { 'user': { S: 'Zeppelin' }, 'favoriteColor': {S: 'blue'}, 'isAwesome': { 'BOOL': true } } },
    function ( err, result ) {
        if ( err ) {
            console.log('Error: ' + err);
        }
        else {
            console.log( result );
        }
});
