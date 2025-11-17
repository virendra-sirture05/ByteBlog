"use server"
import { auth } from '@clerk/nextjs/server';
import {z} from 'zod';

const createArticleSchema = z.object({
    title : z.string().min(3).max(100),
    category : z.string().min(3).max(50),
    content : z.string().min(3).max(100)
})

type CreateArticleFormState = {
    error : {
        title?: string[],
        category?: string[],
        content?: string[],
        featuredImage?:string[],
        formErrors?:string[]
    }
}

export const createArticle = async(previousState: CreateArticleFormState, formData : FormData): Promise<CreateArticleFormState> =>{
    const result = createArticleSchema.safeParse({
        title : formData.get("title"),
        category : formData.get("category"),
        content : formData.get("content")
    })
    if(!result.success){
        return {
            error : result.error.flatten().fieldErrors,
        }
    }

    const {userId} = await auth();
    if(!userId){
        return{
            error : {
                formErrors : ["you have to login first"]
            }
        }
    }

}