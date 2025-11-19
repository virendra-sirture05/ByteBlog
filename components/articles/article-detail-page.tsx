import { Prisma } from '@/app/generated/prisma'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import LikeButton from './like-button'
import CommentInput from '../comments/comment-input'
import CommentList from '../comments/comment-list'
import { prisma } from '@/lib/prisma'


type ArticleDetailsPageProps = {
    article : Prisma.ArticlesGetPayload<{
        include : {
            author : {
                select : {
                    name : true,
                    email : true,
                    imageUrl : true
                }
            }
        }
    }>
}
const ArticleDetailsPage = async({article}: ArticleDetailsPageProps) => {

    const comments = await prisma.comment.findMany({
        where : {
            articleId : article.id
        },
        include:{
            author : {
                select : {
                    name : true,
                    email : true,
                    imageUrl : true
                }
            }
        }
    })
  return (
    <div className="min-h-screen bg-background">
        {/* Reuse your existing Navbar */}

      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
            {/* Article Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-muted-foreground">
              <Avatar className="h-10 w-10">
                <AvatarImage src={article.author.imageUrl as string} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {article.author.name}
                </p>
                <p className="text-sm">
                  {article.createdAt.toDateString()} · {12} min read
                </p>
              </div>
            </div>
          </header>
           {/* Article Content */}
          <section
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Like button  */}

          <LikeButton />

          {/* comment input  */}

          <CommentInput articleId={article.id} />

          {/* comment list  */}

          <CommentList comments={comments} />
        </article>
      </main>
    </div>
  )
}

export default ArticleDetailsPage