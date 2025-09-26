import { NextResponse } from "next/server";
import { Client, Storage, ID } from "appwrite";
import fs from 'fs';
const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('68d3fcbe000218b8b9b8');

const storage = new Storage(client);
export async function POST(req) {
  try {
    // 1️⃣ Parse the incoming JSON body
    const { prompt, width, height, seed, model } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // 2️⃣ Build the Pollinations image generation URL
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

    // 3️⃣ Return the image URL as the result
    // console.log("Generated image:", imageUrl);
  

    // const fileBuffer = fs.readFileSync(imageUrl);

    const fileId = ID.unique();
    // Change the type from 'audio/mpeg' to 'image/png'
    const file = new File([imageUrl], fileId, { type: 'image/png' });
    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
    const response = await storage.createFile(
      {
        bucketId: bucketId,
        fileId: fileId,
        file: file
      } 
    );
    console.log('File uploaded successfully:', response);

    return NextResponse.json({ 'result': imageUrl });

  } catch (e) {
    console.error("Image generation error:", e);
    return NextResponse.json({ 'error': e });
  }
}
