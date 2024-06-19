const { highlight, debug} = require('../logger')('commands:start');

module.exports = function start(config) {
  highlight('  Starting the app  ' );
  debug(' Received configuration in start -', config);
}