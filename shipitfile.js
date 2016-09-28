module.exports = function (shipit) {
  require('shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      workspace: 'tmp/build',
      deployTo: '/home/budget-staging/Budget-Public-Staging',
      repositoryUrl: 'https://github.com/JumpStartGeorgia/Georgian-Budget-Public',
      ignores: ['.git', 'node_modules'],
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

  shipit.on('updated', function() {
    shipit.remote(`node -v && cd ${shipit.releasePath} && npm install --production`)
    shipit.remote(`node -v && cd ${shipit.releasePath} && npm build`)
  })

  
}
