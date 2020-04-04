const RO = require('@rewardops/rewardops-sdk');

const application = require('./application');
const config: ServerNode.ExtendedConfiguration = require('./configuration')
  .config;

/*
 * Starts a RewardOps server instance.
 *
 * @returns {Promise<http.Server>} A promise that resolves with the server instance once the server is listening
 */
function run() {
  return new Promise(function(resolve, reject) {
    application.initialize();

    // Start the server
    const app = application.app;
    const serverInstance = app.listen(config.env.port);
    serverInstance.on('close', function closeCallback() {
      serverInstance.removeListener('close', closeCallback);
    });
    serverInstance.on('listening', function(err: any) {
      if (err) {
        reject(err);
        return;
      }
      if (config.logging.verbose === true) {
        console.log(
          `RewardOps catalog app server running on port ${
            serverInstance.address().port
          } with NODE_ENV "${config.nodeEnv}"`
        );
        console.log('Using RewardOps API at ' + RO.urls.apiBaseUrl());
      }
      resolve(serverInstance);
    });
  });
  // });
}

/*
 * If called from the command line, run the server.
 *
 * Accepts one optional command-line argument:
 *
 * `--port`: the server port number
 *
 * Set the env by setting the environment variable
 * `NODE_ENV` (e.g., 'development', 'production').
 *
 * e.g.:
 *
 * NODE_ENV=staging node server --port 9000
 */
if (require.main === module) {
  run().catch(function(err) {
    console.log(err);
  });
}

module.exports = {};
module.exports.run = run;
