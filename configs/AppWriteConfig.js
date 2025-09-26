import { Client, Storage } from "appwrite";
import fs from 'fs';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('68d3fcbe000218b8b9b8');

const storage = new Storage(client);

export async function uploadFileUsingBuffer({ filePath, fileId }) {
    try {
        console.log(filePath, fileId);
    
        // Read the file as a Buffer
        const fileBuffer = fs.readFileSync(filePath);
    
        // Convert Blob to File
        const file = new File([fileBuffer], fileId, { type: 'audio/mpeg' }); // File constructor requires a Blob, file name, and options (MIME type)
    
        const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID; 
        const response = await storage.createFile({
          bucketId: bucketId,
          fileId: fileId,
          file: file
        }); // Using File object here
        console.log('File uploaded successfully:', response);
        const fileUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${response.bucketId}/files/${response.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
        const result = storage.getFileDownload({
          bucketId: bucketId,
          fileId: fileId
        });
        return fileUrl;
      } catch (error) {
        console.error('Error uploading file:', error);
      }
}