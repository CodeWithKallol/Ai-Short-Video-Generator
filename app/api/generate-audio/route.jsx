import fs from "fs";
import path from "path";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { uploadFileUsingBuffer} from '@/configs/AppWriteConfig'

export async function POST(req) {
  try {
    // 1. Parse incoming JSON 
    const { text } = await req.json();
    if (!text) {
      return new Response(JSON.stringify({ error: "Text is required" }), {
        status: 400,
      });
    }

    // 2. Call Murf API
    const response = await axios.post(
      "https://api.murf.ai/v1/speech/generate",
      {
        text,
        voiceId: "en-US-natalie", // ✅ You can make this dynamic too
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": process.env.MURF_API_KEY, // 🔑 Use env var for security
        },
      }
    );

    // 3. Extract the audio file URL from Murf API
    const audioUrl = response.data?.audioFile;
    if (!audioUrl) {
      return new Response(
        JSON.stringify({ error: "Failed to get audio file URL" }),
        { status: 500 }
      );
    }

    // 4. Download the MP3
    const audioResponse = await axios.get(audioUrl, {
      responseType: "arraybuffer",
    });
    const uuid = uuidv4();
    // 5. Save MP3 in `public/audio/` folder
    const fileName = `${uuid}.mp3`;
    const audioDir = path.join(process.cwd(), "public", "audio");
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    const filePath = path.join(audioDir, fileName);
    fs.writeFileSync(filePath, audioResponse.data);

    // 6. Return the public URL of the MP3
    const publicUrl = `/audio/${fileName}`;
    const result = await uploadFileUsingBuffer({ filePath: filePath, fileId: uuid });

    return new Response(JSON.stringify({ success: true, url: result }), {
      status: 200,
    });
  } catch (error) {
    console.error("❌ Error generating audio:", error.response?.data || error);
    return new Response(
      JSON.stringify({
        error: error.response?.data || "Something went wrong",
      }),
      { status: 500 }
    );
  }
}
