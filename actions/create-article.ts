"use server"
import { auth } from '@clerk/nextjs/server';
import {z} from 'zod';
import { v2 as cloudinary, UploadApiResponse} from 'cloudinary';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const createArticleSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
    category: z.string().min(1, "Category is required"),
    content: z.string().min(1, "Content is required")
});

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
    try {
        // Validate form data
        const result = createArticleSchema.safeParse({
            title : formData.get("title"),
            category : formData.get("category"),
            content : formData.get("content") || ""
        });
        
        if(!result.success){
            return {
                error : result.error.flatten().fieldErrors,
            }
        }

        // Check authentication
        const {userId} = await auth();
        if(!userId){
            return{
                error : {
                    formErrors : ["You have to login first"]
                }
            }
        }

        // Find user
        const existingUser = await prisma.user.findUnique({
            where : {clerkUserId : userId}
        });
        
        if(!existingUser) {
            return {
                error : {
                    formErrors : ["User not found"]
                }
            }
        }

        // Handle image upload
        const imageFile = formData.get("featuredImage") as File | null;
        
        if(!imageFile || imageFile.size === 0){
            return{
                error:{
                    featuredImage : ["Image file is required"]
                }
            }
        }

        // Convert file to base64 for upload
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = `data:${imageFile.type};base64,${buffer.toString('base64')}`;

        // Upload to Cloudinary with better error handling
        let imageUrl: string;
        try {
            const uploadResult = await cloudinary.uploader.upload(base64Image, {
                folder: "blog-articles",
                resource_type: "auto",
            });
            
            imageUrl = uploadResult.secure_url;
        } catch (cloudinaryError: any) {
            console.error("Cloudinary upload error:", cloudinaryError);
            return {
                error: {
                    featuredImage: [`Upload failed: ${cloudinaryError.message || 'Unknown error'}`]
                }
            };
        }

        // Create article in database
        await prisma.articles.create({
            data:{
                title : result.data.title,
                category: result.data.category,
                content : result.data.content,
                featuredImage : imageUrl,
                authorId : existingUser.id
            }
        });

        revalidatePath("/dashboard");
        redirect("/dashboard");

    } catch (error: any) {
        console.error("Create article error:", error);
        
        // Don't return error if redirect was called
        if (error.message?.includes('NEXT_REDIRECT')) {
            throw error;
        }
        
        return {
            error: {
                formErrors: [error.message || "An unexpected error occurred"]
            }
        };
    }
}