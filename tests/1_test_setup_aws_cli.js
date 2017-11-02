const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
var assert = require('assert');
var path = process.cwd();

describe('1. Setup Aws Cli', function () {
  it('should config system credentials', async function () {
    let s3 = new AWS.S3();
    let buckets = await s3.listBuckets().promise();
  });
  it('should configure in courses directory credential.json', async function () {
    AWS.config.loadFromPath( path + '/courses/credentials.json')    
    let s3 = new AWS.S3();
    let buckets = await s3.listBuckets().promise();
  });
});
