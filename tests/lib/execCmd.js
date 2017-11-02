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

module.exports = execCmd