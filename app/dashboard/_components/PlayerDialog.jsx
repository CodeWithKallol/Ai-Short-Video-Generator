import React, { useEffect, useState } from 'react'
import { Player } from "@remotion/player";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import RemotionVideo from './RemotionVideo';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

function PlayerDialog({playVideo, videoId}) {

    const [openDialog, setOpenDialog] = useState(false);
    const [videoData, setVideoData] = useState();
    const [durationInFrame, setDurationInFrame] = useState(100);
    const router = useRouter();

    useEffect(()=>{
        setOpenDialog(playVideo);
        videoId&&GetVideoData();
    }, [playVideo])

    const GetVideoData = async() =>{
        const result = await db.select().from(VideoData)
        .where(eq(VideoData.id, videoId));

        console.log(result);
        setVideoData(result[0]);
    }

  return (
    <Dialog open={openDialog}>
        
        <DialogContent className='flex flex-col items-center justify-center'>
            <DialogHeader>
            <DialogTitle className='text-3xl font-bold my-5'>Your video is ready</DialogTitle>
            <DialogDescription>
                <Player
                    component={RemotionVideo}
                    durationInFrames={Number(durationInFrame.toFixed(0))}
                    compositionWidth={300}
                    compositionHeight={450}
                    fps={30}
                    controls={true}
                    inputProps={{
                        ...videoData,
                        setDurationInFrame:(frameValue)=>setDurationInFrame(frameValue)
                    }}
                />
                <div className='flex gap-10 items-center justify-center mt-10'>
                    <Button variant='ghost' onClick={()=>{router.replace('/dashboard'); setOpenDialog(false)}}>Cancel</Button>
                    <Button className='bg-indigo-700 text-white hover:bg-green-700'>Export</Button>
                </div>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default PlayerDialog