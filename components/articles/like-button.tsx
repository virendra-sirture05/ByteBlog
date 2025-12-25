"use client"
import React, { useOptimistic, useTransition } from 'react'
import { Button } from '../ui/button'
import { Bookmark, Share2, ThumbsUp } from 'lucide-react'
import { likeDislikeToggle } from '@/actions/like-dislike';
import { Like } from '@/app/generated/prisma';

type LikeButtonProps = {
  articleId : string,
  likes : Like[],
  isLiked : boolean
}

const LikeButton : React.FC<LikeButtonProps> = ({articleId, likes, isLiked}) => {
  const [optimistic, setOptimistic] = useOptimistic(likes.length);
  const [isPending, startTransition]= useTransition();

  const handleLikeDislike = () =>{
    startTransition(async()=>{
      setOptimistic(isLiked ? optimistic-1 : optimistic+1)
      await likeDislikeToggle(articleId);
    })
  }
  return (
    <form onSubmit={handleLikeDislike} className='flex gap-10 mt-4'>
        <Button type='submit' disabled={isPending}  variant={'ghost'} className='w-4 h-4 cursor-pointer'>
            <ThumbsUp />
            {optimistic}
        </Button>
        <Button variant={'ghost'} className='w-4 h-4'>
            <Bookmark />
        </Button>
        <Button variant={'ghost'} className='w-4 h-4'>
            <Share2 />
        </Button>
    </form>
  )
}

export default LikeButton