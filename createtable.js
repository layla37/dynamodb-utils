var AWS = require('aws-sdk');

var dynamodbConfig = {
	'endpoint': new AWS.Endpoint('http://localhost:8000'),
	'accessKeyId': 'placeholderKeyIdForLocalDB',
	'secretAccessKey': 'placeholderSecretAccessKeyForLocalDB',
	'region': 'us-west-1'
};

var dynamoDB = new AWS.DynamoDB(dynamodbConfig);

// Create a Table for users
var table = {
	AttributeDefinitions: [
		{
			AttributeName: 'user',
			AttributeType: 'S'
		}
	],
	KeySchema: [
		{
			AttributeName: 'user',
			KeyType: 'HASH'
		}
	],
	// Define read per second and write per second
	ProvisionedThroughput: {
		ReadCapacityUnits: 1,
		WriteCapacityUnits: 1
	},
	TableName: 'users'
};

dynamoDB.createTable(table, function (error, data) {
	if (error) {
		console.log('Error: ' + error);
	} else {
		console.log('users table successfully created');
	}
});
