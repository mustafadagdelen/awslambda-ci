
def bucket = 'md-deploy-packages'
def functionName = 'hello-world'
def region = 'eu-west-1'

node('master'){
    stage('Checkout'){
        checkout scm
        sh 'git fetch --tags'
    }


      stage('Build'){
        zip zipFile: "${tagId()}.zip", glob: '**/*.js'
    }

    stage('Test'){
     
    }

    stage('Push'){
        s3Upload(file: "${tagId()}.zip", bucket: bucket)
        print("Uploaded to bucket")
    }

    stage('Deploy'){
         input("Deploy To Lambda?")

        functionCode = "s3://${bucket}/${tagId()}.zip"

        print functionCode

        deployLambda(awsRegion: 'us-west-1', awsAccessKeyId : "${env.AWS_ACCESS_KEY_ID}",
         awsSecretKey :"${env.AWS_SECRET_ACCESS_KEY}",functionName :functionName, 
         memorySize : "256", role: 'arn:aws:iam::954880510467:role/lambda-cli-role', 
         runtime : 'nodejs8.10', artifactLocation  : functionCode, handler: 'helloworld.handler',  publish: true)
    }
}

def tagId() {
    sh '(git describe --tags `git rev-list --tags --max-count=1`) > .git/tagId'
    def tagId = readFile('.git/tagId').trim()
    print ("Tag Id : ${tagId}")
    sh 'rm .git/tagId'
    tagId
}

environment {
    BUCKET_NAME = 'md-deploy-packages'
}
