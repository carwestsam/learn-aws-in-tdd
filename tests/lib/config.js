let fs = require('fs');
const path = process.cwd();
let config = JSON.parse(fs.readFileSync(path + '/courses/credentials.json'))

module.exports = config
