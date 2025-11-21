"use server"
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { error } from 'console';
import { revalidatePath } from 'next/cache';
import {z} from 'zod'

const createCommentSchema = z.object({
    body : z.string().min(1)
})

type createCommentFormState = {
    errors : {
        body?: string[],
        formErrors?: string[]
    }
}

export const createComment = async(articleId :string, previousState : createCommentFormState, formdata : FormData) : Promise<createCommentFormState> =>{
    const result = createCommentSchema.safeParse({body : formdata.get('body')});
    if(!result.success){
        return {
            errors : result.error.flatten().fieldErrors
        }
    }
    
    const {userId} = await auth();
    if(!userId) {
        return {
            errors :{
                formErrors : ["You have to login first"]
            }
        }
    }

    const existingUser = await prisma.user.findUnique({
        where:{
            clerkUserId : userId
        }
    })

    if(!existingUser){
        return {
            errors : {
                formErrors : ["user not found, please register before adding comment"]
            }
        }
    }
    try {
        await prisma.comment.create({
            data : {
                body : result.data.body,
                authorId : existingUser.id,
                articleId : articleId
            }
        })
    } catch (error : unknown) {
        if(error instanceof Error){
            return {
                errors : {
                    formErrors :[error.message]
                }
            }
        }
        else{
            return {
                errors : {
                    formErrors : ["some internal server error while creating comment"]
                }
            }
        }
    }
    revalidatePath(`/articles/${articleId}`)
    return {errors:{}}
}