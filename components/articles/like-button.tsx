import React from 'react'
import { Button } from '../ui/button'
import { Bookmark, Share2, ThumbsUp } from 'lucide-react'

const LikeButton = () => {
  return (
    <div className='flex gap-10 mt-4'>
        <Button variant={'ghost'} className='w-4 h-4'>
            <ThumbsUp />
            0
        </Button>
        <Button variant={'ghost'} className='w-4 h-4'>
            <Bookmark />
        </Button>
        <Button variant={'ghost'} className='w-4 h-4'>
            <Share2 />
        </Button>
    </div>
  )
}

export default LikeButton