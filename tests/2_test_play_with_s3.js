const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const expect = require('chai').expect
const _ = require('lodash');
const fs = require('fs');
const execCmd = require('./lib/execCmd');
const config = require('./lib/config')

describe('2. Play With S3', function () {
  let course_path = './courses/2_play_with_s3'
  // it ('aws-cli should have rights to create and delete s3 bucket, and files', async function () {
  //   const bucketName = 'aws-tdd-' + uuid();
  //   const region = config.region;
  //   await execCmd(`aws s3api create-bucket --bucket ${bucketName} --region ${region}`);
    
  //   await execCmd(`aws s3api delete-bucket --bucket ${bucketName} --region ${region}`);
  // }).timeout(10000)

  it('2.1 answer all the questions in sampleExam.md', function () {
    let userAnswer = JSON.parse(fs.readFileSync(course_path + '/answers.json'));
    let answer = {
      "1": "BC",
      "2": "A"
    };
    _.map(answer, (v, key) => {
      let ua = _.upperCase(userAnswer[key])
      if (ua.length > v.length) {
        throw `question ${key}: has incorrect answer`
      } else if ( ua.length < v.length ) {
        throw `question ${key}: is missing answer`
      }
      expect(ua.length).to.equal(v.length)
      _.map(v, ch => {
        if (ua.indexOf(ch) == -1){
          throw `question ${key}: missing correct answer ${ch}`
        }
      })
    })
  })
})
