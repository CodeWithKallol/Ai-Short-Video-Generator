import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function SelectDuration({onUserSelect}) {
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-2xl text-indigo-700'>Duration</h2>
        <p className='text-gray-400'>Select the duration of your video</p>
        <Select onValueChange={(value)=> {
            
            onUserSelect('duration', value);
        }}>
            <SelectTrigger className="w-full mt-2 p-6 text-lg cursor-pointer">
                <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent>

                <SelectItem value='15 Seconds' key='15 Seconds' className='cursor-pointer'>15 Seconds</SelectItem>
                <SelectItem value='30 Seconds' key='30 Seconds' className='cursor-pointer'>30 Seconds</SelectItem>
                <SelectItem value='60 Seconds' key='60 Seconds' className='cursor-pointer'>60 Seconds</SelectItem>
             
            </SelectContent>
        </Select>

    </div>
  )
}

export default SelectDuration