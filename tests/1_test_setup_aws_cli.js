const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
var assert = require('assert');
var path = process.cwd();

const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function execCmd(cmd) {
  const { stdout, stderr } = await exec(cmd);
  if (stderr.length !== 0) {
    throw stderr
  } else {
    return stdout
  }
}

describe('1. Setup Aws Cli', function () {
  it('should config system credentials', async function () {
    let s3 = new AWS.S3();
    let buckets = await s3.listBuckets().promise();
  });
  it('should working with aws cli command tool', async function () {
    await execCmd('aws s3 ls')
  })
  it('should configure in courses directory credential.json', async function () {
    AWS.config.loadFromPath( path + '/courses/credentials.json')    
    let s3 = new AWS.S3();
    let buckets = await s3.listBuckets().promise();
  });
});
