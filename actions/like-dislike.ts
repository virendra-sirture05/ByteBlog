"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";


export const likeDislikeToggle = async(articleId : string) =>{
    const {userId} = await auth();
    if(!userId) {
        throw new Error("you have to be login")
    }
    const user = await prisma.user.findUnique({
        where:{
            clerkUserId : userId
        }
    })
    if(!user) {
        throw new Error("user does not exist in the database")
    }

    // check the user has already liked the article
    const existingLike = await prisma.like.findFirst({
        where:{articleId, userId : user.id} // use user.id not clerkuserid
    })
    if(existingLike){
        // dislike
        await prisma.like.delete({
            where:{
                id : existingLike.id
            }
        })
    }
    else{
        // like
        await prisma.like.create({
            data : {
                articleId, userId : user.id
            }
        })
    }

    // return updated like count
    revalidatePath(`{/articles/${articleId}}`)
}