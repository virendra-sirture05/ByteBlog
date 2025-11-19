import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const layout = async({children} : {children : React.ReactNode}) => {
    const user = await currentUser();
    
    // ✅ User logged in hai to database me check/create karo
    if(user) {
        const loggedInUser = await prisma.user.findUnique({
            where:{
                clerkUserId : user.id
            }
        })
        
        if(!loggedInUser){
            await prisma.user.create({
                data:{
                    name : `${user.firstName} ${user.lastName}`,
                    clerkUserId : user.id,
                    email : user.emailAddresses[0].emailAddress,
                    imageUrl : user.imageUrl
                }
            })
        }
    }
    
    // ✅ Hamesha children return karo, logged in ho ya na ho
    return (
        <div>{children}</div>
    )
}

export default layout