import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'

var AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic
const s3BucketName = process.env.ATTACHMENT_S3_BUCKET

const urlExpiration = process.env.SIGNED_URL_EXPIRATION

export class AttachmentUtils {
    constructor(
        private readonly s3 = new XAWS.S3({signatureVersion: 'v4'}),
        private readonly bucketName = s3BucketName,
        private readonly time = urlExpiration
    ) {}
        getAttachmentUrl(todoId:string) {
            return 'https://' + this.bucketName + '.s3.ap-southeast-1.amazonaws.com/' + todoId
        }

        getUploadUrl(todoId: string) : string {
            return this.s3.getSignedUrl('putObject', {
                Bucket: this.bucketName,
                Key: todoId,
                Expires: parseInt(this.time)
            }) as string
        }
}