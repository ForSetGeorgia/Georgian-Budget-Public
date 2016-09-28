module.exports = function (shipit) {
  require('shipit-deploy')(shipit)
  require('shipit-shared')(shipit);
  require('shipit-npm')(shipit);

  shipit.initConfig({
    default: {
      npm: {
        remote: true
      },

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

  shipit.on('deployed', function() {
    shipit.start('start_server')
  })

  shipit.blTask('build', function() {
    shipit.log('Running npm build to build project')
    shipit.remote(`node -v && cd ${shipit.releasePath} && npm run build`)
  })

  shipit.blTask('start_server', function() {
    shipit.log('Starting node server')
    shipit.remote(`node -v && cd ${shipit.currentPath} && npm start`)
  })
}
