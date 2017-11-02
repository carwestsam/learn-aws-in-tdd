const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const execCmd = require('./lib/execCmd');
const config = require('./lib/config')

describe('2. Play With S3', function () {
  it ('aws-cli should have rights to create and delete s3 bucket, and files', async function () {
    const bucketName = 'aws-tdd-' + uuid();
    const region = config.region;
    await execCmd(`aws s3api create-bucket --bucket ${bucketName} --region ${region}`);
    
    await execCmd(`aws s3api delete-bucket --bucket ${bucketName} --region ${region}`);
  }).timeout(10000)
})