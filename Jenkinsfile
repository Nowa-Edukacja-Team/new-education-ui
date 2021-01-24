pipeline {
  agent any

  environment {
      registry = "new-education/new-education-ui"
      version = "latest"
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
        docker.withRegistry('', registryCredential) {
            dockerImage.push()
        }
      }
    }
    stage('Remove created Image') {
      steps {
        sh "docker rmi $registry:$version"
      }
    }
    stage('Apply Kubernetes Files') {
      steps {
          withKubeConfig([credentialsId: 'kubeconfig']) {
            sh 'cd kubernetes'
            sh 'cat deployment.yml | sed "s/{{PACKAGE_VERSION}}/$version/g" |  sed "s/{{PACKAGE_NAME}}/$registry/g" | kubectl apply -f -'
            sh 'kubectl apply -f service.yml'
        }
      }
    }
  }
}