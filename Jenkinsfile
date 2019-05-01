
def bucket = 'deployment-packages-mlabouardy'
def functionName = 'Fibonacci'
def region = 'eu-west-1'

node('slaves'){
    stage('Checkout'){
        checkout scm
    }

    stage('Test'){
     
    }

    stage('Build'){
        sh "zip ${commitID()}.zip main"
    }

    stage('Push'){
        sh "aws s3 cp ${commitID()}.zip s3://${bucket}"
    }

    stage('Deploy'){
        sh "aws lambda update-function-code --function-name ${functionName} \
                --s3-bucket ${bucket} \
                --s3-key ${commitID()}.zip \
                --region ${region}"
    }
}

def tag() {
    sh 'git rev-parse HEAD > .git/commitID'
    def commitID = readFile('.git/commitID').trim()
    sh 'rm .git/commitID'
    commitID
}