import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

interface Event {
  readonly key: string;
  readonly imageBase64: string;
}

interface Response {
  readonly statusCode: number;
  readonly body: object;
}

const s3Client: S3Client = new S3Client({ region: process.env.REGION });

export const handler = async (event: Event): Promise<Response> => {
  try {
    const { key, imageBase64 } = event;

    if (!key || !imageBase64) {
      return response(400, {
        message: "Both key and imageBase64 are required",
      });
    }

    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.BUCKET,
      Key: key,
      Body: Buffer.from(imageBase64, "base64"),
      ContentType: "image/jpeg",
    }));

    return response(200, {
      message: "Image uploaded successfully"
    })
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    return response(500, {
      message: "Failed to upload image",
      error: error.message,
    });
  }
};

const response = (statusCode: number, body: object): Response => ({
  statusCode,
  body
})
