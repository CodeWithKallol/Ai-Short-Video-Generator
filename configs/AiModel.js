const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


export const chatSession = model.startChat({
generationConfig,
history: [
    {
    role: "user",
    parts: [
        {
        text: "Write a script to generate 30 seconds video on topic: Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field",
        },
    ],
    },
    {
    role: "model",
    parts: [
        {
        text: '```json\n{\n  "video_scenes": [\n    {\n      "scene_number": 1,\n      "duration": 5,\n      "imagePrompt": "A bustling 18th century London street scene, cobblestones wet from a recent rain, horse-drawn carriages and pedestrians in period clothing, the tall, shadowy buildings with signs above shops. realistic, daylight.",\n      "contextText": "In 1764, London was a vibrant, chaotic hub. But amidst the noise, a secret was being whispered..."\n    },\n    {\n       "scene_number": 2,\n      "duration": 5,\n      "imagePrompt": "Interior of a dimly lit coffee house, with men in wigs and coats gathered around a table, one man with a quill and paper, conspiratorial expressions on their faces, candlelight illuminating the scene. realistic, dramatic lighting.",\n     "contextText": "At a dimly lit coffee house, a small group of men gathered, plotting something extraordinary."\n    },\n    {\n       "scene_number": 3,\n       "duration": 7,\n      "imagePrompt": "A close-up of a handwritten document with elaborate script, a small magnifying glass is resting on it, partially revealing the words \'Longitude Act\' along with other text in old style. realistic, still life.",\n     "contextText": "They were determined to solve one of the biggest challenges of their time: determining longitude at sea, a secret held by sailors for centuries."\n    },\n    {\n       "scene_number": 4,\n       "duration": 5,\n      "imagePrompt": "A wide shot of a ship sailing in the open ocean on a sunny day, with the sun reflecting on the water, waves crashing against the side of the ship. A man with old telescope looks over the horizon. realistic, expansive view.",\n      "contextText": "Navigators faced perilous journeys, lost at sea without a reliable way to calculate their location, leading to many shipwrecks."\n    },\n    {\n      "scene_number": 5,\n      "duration": 8,\n      "imagePrompt": "An intricate, golden pocket watch, with visible gears and components, resting on a velvet cloth, light reflecting off its surface. close up, realistic.",\n      "contextText": "This group of men backed a humble clockmaker named John Harrison, who spent years crafting a revolutionary device: the marine chronometer. His device was so precise, it could tell time at sea, therefore calculating longitude. A device that changed the world forever."\n    }\n  ]\n}\n```\n',
        },
    ],
    },
],
});