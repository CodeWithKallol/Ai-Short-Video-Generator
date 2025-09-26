import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json(); // Use the correct method to parse JSON.
    console.log(prompt);

    // Send the message and await the response.
    const result = await chatSession.sendMessage(prompt);

    // Extract the text from the response correctly.
    const responseText = await result.response.text(); 
    console.log(responseText);

    // Return the parsed JSON response.
    return NextResponse.json({ result: JSON.parse(responseText) });
  } catch (e) {
    console.error(e.message);
    return NextResponse.json({ error: e.message });
  }
}