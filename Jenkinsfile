pipeline {
  agent any

  environment {
      registry = "neweducation/new-education-ui"
      version = "v0.0.$BUILD_NUMBER"
      registryCredential = "dockerhub"
      dockerImage = ''
  }

  stages {
    stage('Create Image') {
      steps {
        script {
            dockerImage = docker.build registry + ":" + version
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
        sh "docker rmi $registry:$version"
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
          sh 'cat ./kubernetes/deployment.yml | sed "s#{{PACKAGE_VERSION}}#$version#g" | sed "s#{{PACKAGE_NAME}}#$registry#g" | kubectl apply -n ui -f -'
          sh 'kubectl apply -n ui -f ./kubernetes/service.yml'
        }
      }
    }
  }
}