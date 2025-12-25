import { Prisma } from "@/app/generated/prisma";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LikeButton from "./like-button";
import CommentInput from "../comments/comment-input";
import CommentList from "../comments/comment-list";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

type ArticleDetailsPageProps = {
  article: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>;
};

const ArticleDetailsPage = async ({ article }: ArticleDetailsPageProps) => {
  // 1. Fetch comments
  const comments = await prisma.comment.findMany({
    where: {
      articleId: article.id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  // 2. Fetch likes
  const likes = await prisma.like.findMany({
    where: {
      articleId: article.id,
    },
  });

  // 3. Auth check (very important for Vercel SSR)
  const { userId } = await auth();

  // userId null ho sakta hai → crash avoid
  let user = null;
  if (userId) {
    user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
  }

  // 4. Determine if current user liked the article
  const isLiked: boolean = user
    ? likes.some((like) => like.userId === user.id)
    : false;

  return (
    <div className="min-h-screen bg-background">
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
                <AvatarImage src={article.author.imageUrl || ""} />
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {article.author.name}
                </p>
                <p className="text-sm">
                  {article.createdAt.toDateString()} · 12 min read
                </p>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <section
            className="
    prose prose-lg dark:prose-invert
    max-w-none
    mb-12
    overflow-hidden
    break-words

    prose-img:max-w-full
    prose-img:h-auto
    prose-img:rounded-lg
    prose-img:mx-auto

    prose-pre:overflow-x-auto
    prose-pre:max-w-full

    prose-code:break-words
  "
          >
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </section>

          {/* Like Button */}
          <LikeButton articleId={article.id} likes={likes} isLiked={isLiked} />

          {/* Comment Input */}
          <CommentInput articleId={article.id} />

          {/* Comments List */}
          <CommentList comments={comments} />
        </article>
      </main>
    </div>
  );
};

export default ArticleDetailsPage;
