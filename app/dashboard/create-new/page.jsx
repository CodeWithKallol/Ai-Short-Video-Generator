"use client"
import React, { useContext, useEffect, useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from '@/app/_context/VideoDataContext';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';


function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState([]);
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const {videoData, setVideoData} = useContext(VideoDataContext);
  const {user} = useUser();

  const onHandleInputChange = (fieldName, fieldValue) =>{
    console.log(fieldName, fieldValue);
    
    setFormData(prev=>({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  const onCreateClickHandler=()=>{
    GetVideoScript();
  }

  // Get video script 
  const GetVideoScript = async ()=>{
    setLoading(true);
    const prompt = 'Write a script to generate '+formData.duration+' video on topic: '+formData.topic+' along with AI image prompt in '+formData.imageStyle+' format for each scene and give me result in JSON format with imagePrompt and ContentText as field'
    console.log(prompt);
    try{
      const result = await axios.post('/api/get-video-script', {
      prompt: prompt
    }).then(resp=>{
      console.log(resp.data.result);
      setVideoData(prev=>({
        ...prev,
        'videoScript':resp.data.result
      }))
      setVideoScript(resp.data.result.video_scenes);
      GenerateAudioFile(resp.data.result.video_scenes);
    })
  }catch(error){
    console.log("The Error is: ", error);
  }
  setLoading(false);
  }

  const GenerateAudioFile = async(videoScriptData)=>{
      let script = '';
      const id = uuidv4();
      videoScriptData.forEach(item=>{
        script = script + item.contextText + ' ';
      })
      console.log(script);

      try{
        await axios.post('/api/generate-audio', {
          text: script,
          voiceId: id
        }).then(resp=>{
          console.log(resp.data);
          setVideoData(prev=>({
            ...prev,
            'audioFileUrl':resp.data.url
          }))
          setAudioFileUrl(resp.data.url);
          
          GenerateAudioCaption(resp.data.url, videoScriptData);
        })
      }catch(error){
        console.log(error);
      }
  }


  const GenerateAudioCaption = async(fileUrl, videoScriptData) =>{
    setLoading(true);

    try{
      await axios.post('/api/generate-caption', {
      audioFileUrl: fileUrl
      }).then(resp=>{
        console.log(resp.data.result);
        setCaptions(resp?.data?.result);
        setVideoData(prev=>({
        ...prev,
        'captions':resp.data.result
      }))
        GenerateImage(videoScriptData);
      })
    } catch(e){
      console.log(e);
    }

    setLoading(false);
  }

const GenerateImage = async (scriptData) => { // ACCEPT the data as an argument
  // Use the ARGUMENT here, not the state variable 'videoScript'
  if (!scriptData || scriptData.length === 0) {
    console.log("No video script available to generate images.");
    return;
  }

  console.log("Starting image generation for", scriptData.length, "scenes.");
  setLoading(true);

  try {
    // Use the ARGUMENT 'scriptData' in your map function
    const imagePromises = scriptData.map(element => 
      axios.post('/api/generate-image', {
        prompt: element.imagePrompt,
        width: 1024,
        height: 1024,
        seed: Math.floor(Math.random() * 100000),
        model: "flux"
      })
    );

    const responses = await Promise.all(imagePromises);
    const imageUrls = responses.map(resp => resp.data.result);

    console.log("Successfully generated image URLs:", imageUrls);
    
    setVideoData(prev=>({
        ...prev,
        'imageList':imageUrls
      }))
    setImageList(imageUrls);
    console.log("--- Logging Each URL Separately ---");
    imageUrls.forEach((url, index) => {
      console.log(`Image ${index + 1}: ${url}`);
    });
  } catch (error) {
    console.error("Image generation failed:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(()=>{
    console.log(videoData);
    if(Object.keys(videoData).length == 4){
      SaveVideoData(videoData);
    }
  }, [videoData]);

  const SaveVideoData = async(videoData) =>{
    setLoading(true);
    const result = await db.insert(VideoData).values({
      script: videoData?.videoScript,
      audioFileUrl: videoData?.audioFileUrl,
      captions: videoData?.captions,
      imageList: videoData?.imageList,
      createdBy: user?.primaryEmailAddress?.emailAddress
    }).returning({id:VideoData?.id})

    console.log(result);
    setLoading(false);
  }
  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-indigo-700 text-center'>Create New</h2>

      <div className='mt-10 shadow-md p-10'>
        {/*Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange}/>
        {/*Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange}/>
        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange}/>
        {/* Create Button */}
        <Button className='mt-10 w-full bg-indigo-700 cursor-pointer font-bold text-xl p-5 hover:bg-green-700' onClick={onCreateClickHandler}>Create Short Video</Button>
      </div>
      <CustomLoading loading={loading}/>
    </div>
  )
}

export default CreateNew