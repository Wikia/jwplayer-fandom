@Library('GlobalSharedLibrary') _
def FAILED_STAGE
def issueKey
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
            commitMsg = releaseTracking.getGitCommitMessage()
            issueKey = releaseTracking.changeStart(
              [
              affectedApp        : "Fandom Community Platform",
              affectedService    : "jwplayer",
              environment        : "Development" ,
              version            : "jwplayer-" + imageTag,
              extraDescription   : """
                 Deployment information:
                 - *Branch:* [https://github.com/Wikia/jwplayer-fandom/tree/${params.branch}]
                 - *Commit message:* ${commitMsg}
                 - *Image tag:* ${imageTag}
                 - *Build Url:* ${env.BUILD_URL}
                 """,
              relatedIssues       : releaseTracking.getIssueKeysFromText(commitMsg),
              datacentersImpacted : ["poz-dev"]
              ]
            )
            echo "Jira issue key: ${issueKey}"
            }
          }
        }

        stage('publish') {
          steps {
            script {
        if (params.dry_run) {
          print("yarn pub")
        } else {
          sh("yarn pub")
        }
        FAILED_STAGE = 'publish'
            }
          }
        }

        stage('Track change completion in Jira') {
          steps {
            script {
				releaseTracking.changeComplete(
				  [
					environment : "Development",
					issueKey    : issueKey,
					success     : true
				  ]
				)
            }
          }
        }
      }
    }
  }
}
