const chalk = require('chalk')

module.exports = function (shipit) {
  require('shipit-deploy')(shipit)
  require('shipit-shared')(shipit)

  shipit.initConfig({
    default: {
      shared: {
        overwrite: true,
        dirs: [
          'node_modules'
        ],
        files: [
          '.env'
        ]
      },
      workspace: 'tmp/build',
      repositoryUrl: 'https://github.com/ForSetGeorgia/Georgian-Budget-Public',
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
      deployTo: '/home/deploy/Budget-Public-Staging',
      servers: 'deploy@beta.forset.ge',
      pm2_config: 'current/config/pm2/staging.json',
      branch: "master"
    },
    production: {
      deployTo: '/home/deploy/Budget-Public',
      servers: 'deploy@alpha.forset.ge',
      pm2_config: 'current/config/pm2/production.json',
      branch: "master"
    }
  });

  shipit.on('sharedEnd', function() {
    shipit.start('install_modules', 'build')
  })

  shipit.blTask('install_modules', function() {
    return shipit.remote(
      `node -v && cd ${shipit.releasePath} && yarn install`
    ).then(function(result) {
      shipit.log(chalk.green('modules successfully installed'))
    }).catch(function(e) {
      shipit.log(chalk.red(e))
      throw e
    })
  })

  shipit.blTask('build', function() {
    return shipit.remote(
      `node -v && cd ${shipit.releasePath} && yarn run build:prod`
    ).then(function(result) {
      const stdout = result[0].stdout

      if (stdout.indexOf('Module build failed') >= 0) {
        throw new Error('webpack build failed')
      }

      shipit.log(chalk.green('build successfully completed'))
    }).catch(function(e) {
      shipit.log(chalk.red(e))
      throw e
    })
  })

  shipit.on('published', function() {
    shipit.start('start_server')
  })

  shipit.blTask('start_server', function() {
    shipit.log('Starting node server')
    command = `node -v && cd ${shipit.config.deployTo} && NODE_PATH=. pm2 startOrRestart ${shipit.config.deployTo}/${shipit.config.pm2_config}`

    console.log(command)

    return shipit.remote(command)
  })
}
