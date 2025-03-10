import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: 'us-east-1', // e.g., "us-east-1"
  credentials: {
    accessKeyId: process.env.accessKeyID as string,
    secretAccessKey: process.env.secretAccessKey as string,
  },
});

const db = DynamoDBDocumentClient.from(client);

export default db;
