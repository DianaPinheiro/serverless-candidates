'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const candidateInfo = (fullname, email, experience) => {
    const timestamp = new Date().getTime();
    return {
        id: uuid.v1(),
        fullname: fullname,
        email: email,
        experience: experience,
        submittedAt: timestamp,
        updatedAt: timestamp,
    };
};

// Create new candidate
module.exports.submit = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const fullname = requestBody.fullname;
  const email = requestBody.email;
  const experience = requestBody.experience;

  if (typeof fullname !== 'string' || typeof email !== 'string' || typeof experience !== 'number') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit candidate because of validation errors.'));
    return;
  }

  submitCandidateP(candidateInfo(fullname, email, experience))
      .then(res => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: `Sucessfully submitted candidate with email ${email}`,
            candidateId: res.id
          })
        });
      })
      .catch(err => {
        console.log(err);
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({
            message: `Unable to submit candidate with email ${email}`
          })
        })
      });
};

const submitCandidateP = candidate => {
    console.log('Submitting candidate');
    const candidateInfo = {
        TableName: process.env.CANDIDATE_TABLE,
        Item: candidate,
    };

    // Creates a new item, or replaces an old item with a new item. If an item that has the same primary key as
    // the new item already exists in the specified table, the new item completely replaces the existing item.
    return dynamoDb.put(candidateInfo).promise()
        .then(res => candidate);
};

// List all candidates
module.exports.list = (event, context, callback) => {
  var params = {
    TableName: process.env.CANDIDATE_TABLE,
    ProjectionExpression: "id, fullname, email"
  };

  console.log("Scanning Candidate table.");
  const onScan = (err, data) => {

    if (err) {
      console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
      callback(err);
    } else {
      console.log("Scan succeeded.");
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          candidates: data.Items
        })
      });
    }

  };

  // The Scan operation returns one or more items and item attributes by accessing every item in a table or a secondary index
  dynamoDb.scan(params, onScan);

};

// Get candidate by ID
module.exports.get = (event, context, callback) => {
    const params = {
        TableName: process.env.CANDIDATE_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
    };

    // The GetItem operation returns a set of attributes for the item with the given primary key.
    // If there is no matching item, GetItem does not return any data and there will be no Item element in the response
    dynamoDb.get(params).promise()
        .then(result => {
            const response = {
                statusCode: 200,
                body: JSON.stringify(result.Item),
            };
            callback(null, response);
        })
        .catch(error => {
            console.error(error);
            callback(new Error('Couldn\'t fetch candidate.'));
            return;
        });
};




