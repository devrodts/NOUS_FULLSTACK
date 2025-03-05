import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  mongoUri: process.env.MONGO_URI || 'mongodb://root:example@localhost:27017/',
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    s3Bucket: process.env.S3_BUCKET || 'local-bucket',
    endpoint: process.env.AWS_ENDPOINT || 'http://localhost:4566',
  },
}));
