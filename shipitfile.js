var chalk = require('chalk');

module.exports = function (shipit) {
  require('shipit-deploy')(shipit)
  require('shipit-shared')(shipit);
  require('shipit-npm')(shipit);

  shipit.initConfig({
    default: {
      npm: {
        remote: true,
        triggerEvent: 'sharedEnd'
      },

      shared: {
        overwrite: true,
        dirs: [
          'node_modules'
        ],
        files: [
          '.env',
          'tmp/foreverPidFile'
        ]
      },

      workspace: 'tmp/build',
      deployTo: '/home/budget-staging/Budget-Public-Staging',
      repositoryUrl: 'https://github.com/JumpStartGeorgia/Georgian-Budget-Public',
      ignores: [
        '.git',
        'node_modules',
        'shipitfile.js',
        'Dockerfile',
        'docker-compose.yml',
        'test'
      ],
      rsync: ['--del'],
      keepReleases: 5,
      shallowClone: true
    },
    staging: {
      servers: 'budget-staging@alpha.jumpstart.ge'
    },
    production: {
    }
  });

  shipit.on('npm_installed', function() {
    shipit.start('build')
  })

  shipit.blTask('build', function() {
    shipit.log('Running npm build to build project')
    return shipit.remote(
      `node -v && cd ${shipit.releasePath} && npm run build`
    ).then(function() {
      shipit.log(chalk.green('npm build complete'));
    }).catch(function(e) {
      shipit.log(chalk.red(e));
    })
  })

  shipit.on('published', function() {
    shipit.start('start_server')
  })

  shipit.blTask('start_server', function() {
    shipit.log('Starting node server')
    return shipit.remote(
      `node -v && cd /home/budget-staging/Budget-Public-Staging/current && (forever restart --spinSleepTime=2000 config/forever/staging.json) || (forever start --spinSleepTime=2000 config/forever/staging.json && forever list)`
    )
  })
}
