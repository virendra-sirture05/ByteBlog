"use server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const deleteArticle = async(articleId : string) => {
    await prisma.$transaction([
        // Pehle Likes delete karo
        prisma.like.deleteMany({
            where: {
                articleId: articleId
            }
        }),
        // Phir Comments delete karo
        prisma.comment.deleteMany({
            where: {
                articleId: articleId
            }
        }),
        // Last mein Article delete karo
        prisma.articles.delete({
            where: {
                id: articleId
            }
        })
    ])
    
    revalidatePath("/dashboard")
}