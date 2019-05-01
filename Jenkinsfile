
def bucket = 'md-deploy-packages'
def functionName = 'hello-world'
def region = 'eu-west-1'

node('master'){
    stage('Checkout'){
        checkout scm
    }

    stage('Test'){
     
    }

    stage('Build'){
        // sh "zip ${tagId()}.zip main"
        sh "pwd"
        zip zipFile: "${tagId()}.zip", glob: '**/*.js'

    }

    stage('Push'){
        s3Upload(file: "${tagId()}.zip", bucket: bucket)
        // s3Upload(file: "helloworld.js", bucket: bucket)
        print("Uploaded to bucket")
    }

    stage('Deploy'){
         input("Deploy To Lambda?")
        // sh "aws lambda update-function-code --function-name ${functionName} \
        //         --s3-bucket ${bucket} \
        //         --s3-key ${tagId()}.zip \
        //         --region ${region}"

        functionCode = "s3://${bucket}/${tagId()}.zip"

        print functionCode

        deployLambda(awsRegion: 'us-west-1', awsAccessKeyId : "${env.AWS_ACCESS_KEY_ID}",
         awsSecretKey :"${env.AWS_SECRET_ACCESS_KEY}",functionName :functionName, 
         memorySize : "256", role: 'arn:aws:iam::954880510467:role/lambda-cli-role', runtime : 'nodejs8.10', artifactLocation  : functionCode, handler: 'handler')
    }
}

def tagId() {
    sh 'git describe --tags > .git/tagId'
    def tagId = readFile('.git/tagId').trim()
    print ("Tag Id : ${tagId}")
    sh 'rm .git/tagId'
    tagId
}

environment {
    BUCKET_NAME = 'md-deploy-packages'
}