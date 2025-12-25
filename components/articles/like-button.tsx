"use client"
import React, { useOptimistic, useTransition } from 'react'
import { Button } from '../ui/button'
import { Bookmark, Share2, ThumbsUp } from 'lucide-react'
import { likeDislikeToggle } from '@/actions/like-dislike'
import { Like } from '@/app/generated/prisma'

type LikeButtonProps = {
  articleId: string
  likes: Like[]
  isLiked: boolean
}

const LikeButton: React.FC<LikeButtonProps> = ({
  articleId,
  likes,
  isLiked,
}) => {
  const [optimistic, setOptimistic] = useOptimistic(likes.length)
  const [isPending, startTransition] = useTransition()

  const handleLikeDislike = () => {
    startTransition(async () => {
      setOptimistic(isLiked ? optimistic - 1 : optimistic + 1)
      await likeDislikeToggle(articleId)
    })
  }

  return (
    <div className="flex gap-10 mt-4">
      <Button
        type="button"
        onClick={handleLikeDislike}
        disabled={isPending}
        variant="ghost"
        className="flex items-center gap-1"
      >
        <ThumbsUp className={isLiked ? "fill-primary" : ""} />
        {optimistic}
      </Button>

      <Button type="button" variant="ghost">
        <Bookmark />
      </Button>

      <Button type="button" variant="ghost">
        <Share2 />
      </Button>
    </div>
  )
}

export default LikeButton
