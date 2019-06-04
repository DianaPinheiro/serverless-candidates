# Building a REST API with AWS Lambda, API Gateway, DynamoDB, and Serverless Framework

In this project you will find an example of how to construct an REST API, to manage candidates for a job in recruitment process, following the Serverless approach using AWS Lambda, API Gateway, DynamoDB, and the Serverless Framework. AWS Lambda is the third compute service from Amazon. It's very different from the existing two compute services EC2 (Elastic Compute Cloud) and ECS (Elastic Container Service). AWS Lambda is an event-driven, serverless computing platform that executes your code in response to events. It manages the underlying infrastructure scaling it up or down to meet the event rate. You're only charged for the time your code is executed. AWS Lambda currently supports Java, Python, and Node.js language runtimes.

## Pre requisites
* AWS account
* Node.js
* AWS CLI and configure it


## Serverless Framework, what is it?

The Serverless Framework enables developers to deploy backend applications as independent functions that will be deployed to AWS Lambda. It also configures AWS Lambda to run your code in response to HTTP requests using Amazon API Gateway.

To install Serverless on your machine, run the below mentioned npm command.
```
$ npm install serverless -g
```

## Install and Run REST API
The starter project relies on a few dependencies that are listed in the ``` package.json ```
After pull the project you should run the bellow command to install all dependencies
```
$ npm install
```

After install the project and all dependencies you can deploy all functions as shown bellow
```
$ serverless deploy
```
If you have a custom profile, you must specify this profile on the command:
```
$ serverless deploy --aws-profile myCustomProfile
```
After run deploy command, you will see in the console the endpoints as shown bellow
```
POST - https://l03cezor8a.execute-api.us-east-1.amazonaws.com/dev/candidates
GET - https://l03cezor8a.execute-api.us-east-1.amazonaws.com/dev/candidates
GET - https://l03cezor8a.execute-api.us-east-1.amazonaws.com/dev/candidates/{id}
```


### Test REST API
To test the API, you can use cURL:

##### Submit new candidate information
```
$ curl -H "Content-Type: application/json" -X POST -d '{"fullname":"Shekhar Gulati","email": "shekhargulati84@gmail.com", "experience":12}' https://l03cezor8a.execute-api.us-east-1.amazonaws.com/dev/candidates
```
##### List all candidates
```
$ curl -X GET https://l03cezor8a.execute-api.us-east-1.amazonaws.com/dev/candidates
```
##### Get candidate by ID
```
$ curl -X GET https://l03cezor8a.execute-api.us-east-1.amazonaws.com/dev/candidates/2e8ef3b0-86af-11e9-aa7e-4bdf5cc26f77
```



