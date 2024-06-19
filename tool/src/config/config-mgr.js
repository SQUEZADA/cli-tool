const logger = require('../logger')("config:mgr");
const { warning,debug } = logger
const { cosmiconfigSync } = require('cosmiconfig');

const schema = require('./schema.json');
const betterAjvErrors = require('better-ajv-errors').default;
const Ajv = require('ajv').default;
const ajv = new Ajv();

const configLoader = cosmiconfigSync('tool');

module.exports = function getConfig() {
  const result = configLoader.search(process.cwd());
  if (!result) {
    warning('Could not find configuration, using default');
    return { port: 1234 };
  } else {
    const isValid = ajv.validate(schema, result.config);
    if (!isValid) {
      warning('Invalid configuration was supplied');
      // console.log(ajv.errors);
      debug(betterAjvErrors(schema, result.config, ajv.errors));
      process.exit(1);
    }
    debug('Found configuration', result.config);
    return result.config;
  }
}