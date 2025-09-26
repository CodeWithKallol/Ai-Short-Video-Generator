import React, { useState } from 'react';
import { Thumbnail } from '@remotion/player';
import RemotionVideo from './RemotionVideo';
import PlayerDialog from './PlayerDialog';
import { Trash2 } from 'lucide-react'; // Import the delete icon

// The component now accepts an `onDelete` function as a prop
function VideoList({ videoList, onDelete }) {
    const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
    const [videoId, setVideoId] = useState();

    // This function handles the delete action
    const handleDelete = (e, videoIdToDelete) => {
        e.stopPropagation(); // Prevents the player dialog from opening
        if (window.confirm('Are you sure you want to delete this video?')) {
            onDelete(videoIdToDelete); // Calls the parent's delete function
        }
    };

    return (
        <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        gap-10'>
            {videoList?.map((video, index) => (
                // Use a 'group' class for hover effects on child elements
                <div key={video?.id} className='relative group'>
                    {/* Delete button - positioned absolutely and appears on hover */}
                    <button
                        onClick={(e) => handleDelete(e, video.id)}
                        className="absolute top-2 right-2 z-10 p-2 bg-red-600 text-white rounded-full 
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                   hover:bg-red-700"
                        aria-label="Delete video"
                    >
                        <Trash2 size={20} />
                    </button>

                    {/* Main video thumbnail area */}
                    <div className='cursor-pointer hover:scale-105 transition-all'
                        onClick={() => {
                            setOpenPlayerDialog(Date.now());
                            setVideoId(video?.id)
                        }}
                    >
                        <Thumbnail
                            component={RemotionVideo}
                            compositionWidth={250}
                            compositionHeight={390}
                            frameToDisplay={30}
                            durationInFrames={120}
                            fps={30}
                            style={{
                                borderRadius: 15,
                            }}
                            inputProps={{
                                ...video,
                                setDurationInFrame: (v) => console.log(v)
                            }}
                        />
                    </div>
                </div>
            ))}
            <PlayerDialog playVideo={openPlayerDialog} videoId={videoId} />
        </div>
    )
}

export default VideoList;