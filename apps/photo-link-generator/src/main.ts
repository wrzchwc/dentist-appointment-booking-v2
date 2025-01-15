import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as process from 'node:process';

interface Event {
  readonly Key: string;
}

interface ErrorResponse {
  readonly statusCode: number;
  readonly body: string;
}

const client = new S3Client({});

export const handler = async (event: Event): Promise<string | ErrorResponse> =>  {
  const { Key } = event;

  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET,
    Key,
  });

  try {
    return await getSignedUrl(client, command, { expiresIn: 3600 });
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error generating signed URL" }),
    };
  }
}
