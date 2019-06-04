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
## Run Project
The starter project relies on a few dependencies that are listed in the ``` package.json ```
After pull the project you should run the bellow command to install all dependencies
```
$ npm install
```
