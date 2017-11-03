const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const assert = require('assert');
const path = process.cwd();

var execCmd = require('./lib/execCmd')

describe('1. Setup Aws Cli', function () {
  it('should working with aws cli command tool', async function () {
    await execCmd('aws s3 ls')
  }).timeout(5000)
  it('should configure in courses directory credential.json', async function () {
    AWS.config.loadFromPath( path + '/courses/credentials.json')    
    let s3 = new AWS.S3();
    let buckets = await s3.listBuckets().promise();
  });
});
