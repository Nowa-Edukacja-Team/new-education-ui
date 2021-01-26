pipeline {
  agent any

  environment {
      PACKAGE = "neweducation/new-education-ui"
      TAG = "v0.0.$BUILD_NUMBER"
      registryCredential = "dockerhub"
      dockerImage = ''
  }

  stages {
    stage('Create Image') {
      steps {
        script {
            dockerImage = docker.build PACKAGE + ":" + TAG
        }
      }
    }
    stage('Publish image to DockerHub') {
      steps {
        script {
          docker.withRegistry('', registryCredential) {
              dockerImage.push()
          }
        }
      }
    }
    stage('Remove created Image') {
      steps {
        sh "docker rmi $PACKAGE:$TAG"
      }
    }
    stage('Create namespace if not present') {
      steps {
        withKubeConfig([credentialsId: 'kubeconfig']) {
          sh 'kubectl get namespace ui || kubectl create namespace ui'
        }
      }
    }
    stage('Deploy to cluster') {
      steps {
        withKubeConfig([credentialsId: 'kubeconfig']) {
          sh 'cat ./kubernetes/deployment.yml | sed "s#{{PACKAGE_VERSION}}#$TAG#g" | sed "s#{{PACKAGE_NAME}}#$PACKAGE#g" | kubectl apply -n ui -f -'
          sh 'kubectl apply -n ui -f ./kubernetes/service.yml'
        }
      }
    }
  }
}