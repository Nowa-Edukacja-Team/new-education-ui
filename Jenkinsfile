pipeline {
  agent any

  environment {
      PACKAGE_NAME = "new-education/new-education-ui"
      PACKAGE_VERSION = "latest"
  }    

  stages {
    stage('Docker Build') {
      steps {
        sh "docker build -t ${env.PACKAGE_NAME}:${env.PACKAGE_VERSION} ."
      }
    }
    stage('Docker Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
          sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
          sh "docker push ${env.PACKAGE_NAME}:${env.PACKAGE_VERSION}"
        }
      }
    }
    stage('Docker Remove Image') {
      steps {
        sh "docker rmi ${env.PACKAGE_NAME}:${env.PACKAGE_VERSION}"
      }
    }
    stage('Apply Kubernetes Files') {
      steps {
          withKubeConfig([credentialsId: 'kubeconfig']) {
          sh 'cd kubernetes'
          sh 'cat deployment.yml | sed "s/{{PACKAGE_VERSION}}/$PACKAGE_VERSION/g" |  sed "s/{{PACKAGE_NAME}}/$PACKAGE_NAME/g" | kubectl apply -f -'
          sh 'kubectl apply -f service.yml'
        }
      }
    }
  }
}