@Library('GlobalSharedLibrary') _
def FAILED_STAGE
def trackingKey
def GIT_COMMIT_HASH
def imageTag = "testImageTag"

DOCKER_IMAGE = 'node:18-slim'

pipeline {
  agent { label 'docker-daemon' }
  options {
    buildDiscarder(
      // Reduces the size of builds and artifacts kept on Jenkins
      logRotator(
        artifactDaysToKeepStr: '5',
        artifactNumToKeepStr: '5',
        daysToKeepStr: '10',
        numToKeepStr: '25'
      )
    )
    disableConcurrentBuilds()
    timeout(time: 1200, unit: 'SECONDS')
  }

  environment {
    GIT_COMMIT_HASH = """${sh(
      returnStdout: true,
      script: 'git rev-parse --short HEAD'
    ).trim()}"""
    NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
    HOME = "${WORKSPACE}"
  }

  stages {
    stage('Lint, Build, Test, Release') {
      agent {
        dockerfile {
          filename 'Dockerfile'
          dir '.jenkins/pr-check'
          label 'docker-daemon'
          reuseNode true
        }
      }
      stages {
        stage('install') {
          steps {
            sh("yarn")
            script {
              FAILED_STAGE = 'install'
            }
          }
        }

        stage('typescript') {
          steps {
            sh("yarn tsc --noEmit")
            script {
              FAILED_STAGE = 'typescript'
            }
          }
        }

        stage('build') {
          steps {
            sh("yarn build")
            script {
              FAILED_STAGE = 'build'
            }
          }
        }

        stage('fetch version') {
          steps {
            script {
              imageTag = sh(returnStdout: true, script: "npm version "+params.version).trim()
              FAILED_STAGE = 'version'
            }
          }
        }

        stage('Track change start in Jira') {
          steps {
            script {
              trackingKey = releaseTracking.deployStart(
                      buildUrl: env.BUILD_URL,
                      organization: 'Wikia',
                      repository: 'jwplayer-fandom',
                      commit: GIT_COMMIT_HASH,
                      imageTag: "jwplayer-$imageTag",
                      service: 'jwplayer',
                      environment: 'Development',
                      datacenter: ["poz-dev"],
                      components: ['Fandom Community Platform']
              )
              echo "Tracking key: ${trackingKey}"
            }
          }
        }

        stage('publish') {
          steps {
            script {
              sh("yarn pub")
              FAILED_STAGE = 'publish'
            }
          }
        }

        stage('Track change completion in Jira') {
          steps {
            script {
              releaseTracking.deployEnd(
                 environment : 'Development',
                 trackingKey : trackingKey,
                 success     : true
              )
            }
          }
        }
      }
    }
  }
}
