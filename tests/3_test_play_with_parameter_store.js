/*
 * ssm nodejs document
 * http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SSM.html
 */

const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const expect = require('chai').expect;
const _ = require('lodash');
const config = require('./lib/config');
const execCmd = require('./lib/execCmd');
const {exportValue} = require('./lib/bashTools');

AWS.config.apiVersions = {
  ssm: '2014-11-06'
};
AWS.config.update({region: config.region})

let ssm = new AWS.SSM();

describe('3, Play with Parameter Store', function () {
  let course3_path = './courses/3_play_with_parameter_store'
  xit('should create a parameter store plain parameter', function () {
    // TODO
  })
  xit('should create a secure string with default key', function () {
    // TODO
  })
  xit('should create a secure string with specific key', function () {
    // TODO
  })
  describe('3.3 should create strings in category', function () {
    let sub_directory = '/3_3_create_with_parameters_in_directory'
    it('3.3.0 check api accessible', async function () {
      let Name = '/tdd/aws/3/parameter_store/name_' + uuid();
      let Value = '/tdd/aws/3/parameter_store/value_' + uuid();

      let putResult = await ssm.putParameter({
        Name,
        Type: 'String',
        Value
      }).promise();

      let param = await ssm.getParameter({Name}).promise();
      
      let delResult = await ssm.deleteParameter({Name}).promise();

      expect(param.Parameter.Value).to.equal(Value);
    }).timeout(6000)

    it('3.3.1 should create strings in different categories', async function () {
      let [name1, name2, name3] = [uuid(), uuid(), uuid()];
      let [value1, value2, value3] = [uuid(), uuid(), uuid()];

      let cmd = ''
      cmd += exportValue('name1', name1);
      cmd += exportValue('name2', name2);
      cmd += exportValue('name3', name3);
      cmd += exportValue('value1', value1);
      cmd += exportValue('value2', value2);
      cmd += exportValue('value3', value3);
      cmd += `/bin/bash ${course3_path}${sub_directory}/create_parameters_in_path.sh`
      
      await execCmd(cmd)

      let reVal1 = await ssm.getParameter({Name:'/tdd/foo/' + name1}).promise();
      let reVal2 = await ssm.getParameter({Name:'/tdd/foo/' + name2}).promise();
      let reVal3 = await ssm.getParameter({Name:'/tdd/bar/' + name3}).promise();
      
      await ssm.deleteParameter({Name: '/tdd/foo/' + name1}).promise();
      await ssm.deleteParameter({Name: '/tdd/foo/' + name2}).promise();
      await ssm.deleteParameter({Name: '/tdd/bar/' + name3}).promise();

      expect(reVal1.Parameter.Value).to.equal(value1);
      expect(reVal2.Parameter.Value).to.equal(value2);
      expect(reVal3.Parameter.Value).to.equal(value3);
    }).timeout(20000)
    it('3.3.2 should fetch parameters in path', async function () {
      let names = ['/tdd/foo/' + uuid(), '/tdd/foo/' + uuid(), '/tdd/bar/' + uuid()];
      let values = [uuid(), uuid(), uuid()];
      
      async function putParameter(Name, Value) {
        await ssm.putParameter({Name, Value, Type:'String'}).promise();
      }
      async function deleteParameter(Name) {
        await ssm.deleteParameter({Name}).promise();
      }

      for (let i=0; i<names.length; i++)
        await putParameter(names[i], values[i])
      
      cmd = `/bin/bash ${course3_path}${sub_directory}/fetch_parameters_in_path.sh`
      
      raw_result = await execCmd(cmd)
      
      for (let i=0; i<names.length; i++)
        await deleteParameter(names[i])

      result = JSON.parse(raw_result)
      params = result.Parameters

      expect(params.length).to.equal(3)
      expect(_.findIndex(params, {Name:names[0]})).not.equal(-1)
      expect(_.findIndex(params, {Name:names[1]})).not.equal(-1)
      expect(_.findIndex(params, {Name:names[2]})).not.equal(-1)
      expect(_.findIndex(params, {Value:values[0]})).not.equal(-1)
      expect(_.findIndex(params, {Value:values[1]})).not.equal(-1)
      expect(_.findIndex(params, {Value:values[2]})).not.equal(-1)
    }).timeout(15000)
  })
})
