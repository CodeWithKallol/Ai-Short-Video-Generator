import fs from "fs";
import path from "path";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { uploadFileUsingBuffer } from "@/configs/AppWriteConfig";

export async function POST(req) {
  try {
    // 1. Parse incoming JSON
    const { text } = await req.json();
    if (!text) {
      return new Response(JSON.stringify({ error: "Text is required" }), {
        status: 400,
      });
    }

    // 2. Call Murf API to get the audio URL
    const murfResponse = await axios.post(
      "https://api.murf.ai/v1/speech/generate",
      {
        text,
        voiceId: "en-US-natalie",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": process.env.MURF_API_KEY,
        },
      }
    );

    const audioUrl = murfResponse.data?.audioFile;
    if (!audioUrl) {
      console.error("Murf API did not return an audio file URL.");
      return new Response(
        JSON.stringify({ error: "Failed to get audio file URL from Murf" }),
        { status: 500 }
      );
    }

    // 3. Download the MP3 audio into a buffer
    const audioResponse = await axios.get(audioUrl, {
      responseType: "arraybuffer",
    });
    const audioBuffer = audioResponse.data;

    // 4. Save the MP3 to the temporary '/tmp' directory
    const uuid = uuidv4();
    const fileName = `${uuid}.mp3`;
    // Vercel's serverless functions can only write to the /tmp directory
    const filePath = path.join("/tmp", fileName);
    fs.writeFileSync(filePath, audioBuffer);
    console.log(`Audio file temporarily saved to: ${filePath}`);

    // 5. Upload the file from the temporary path to Appwrite
    const result = await uploadFileUsingBuffer({
      filePath: filePath,
      fileId: uuid,
    });
    console.log("File successfully uploaded to Appwrite.");

    // 6. Clean up by deleting the file from the /tmp directory
    fs.unlinkSync(filePath);
    console.log(`Temporary file deleted: ${filePath}`);

    // 7. Return the final public URL from Appwrite
    return new Response(JSON.stringify({ success: true, url: result }), {
      status: 200,
    });
  } catch (error) {
    // Log the detailed error on the server for debugging
    console.error("❌ Error in audio generation process:", error.response?.data || error.message);
    return new Response(
      JSON.stringify({
        error: "An internal error occurred. Please check server logs.",
      }),
      { status: 500 }
    );
  }
}
