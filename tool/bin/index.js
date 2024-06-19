#!/usr/bin/env node
const arg = require('arg');
const { warning, debug} = require('../src/logger')('bin');
const getConfig = require('../src/config/config-mgr.js');
const start = require('../src/commands/start.js');

try {
  const args = arg({
    '--start': Boolean,
    '--build': Boolean,
  });
  debug('Received args', args);
  if (args['--start']) {
    const config = getConfig();
    start(config);
  }
} catch (e) {
    warning(e.message);
    usage();
}

function usage() {
  console.log(`${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStarts the app
  ${chalk.greenBright('--build')}\tBuilds the app`);
}
