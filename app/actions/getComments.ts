import prisma from "@/app/libs/prismadb"

export default async function getComments() {
    try{
    
    const comments = await prisma.comment.findMany({
        include: {
            user: true,
        },
        orderBy: {
            createdAt: 'desc'
        } 
    });
 
    const safeComment = comments.map(
        (comment) => ({
            ...comment,
            createdAt: comment.createdAt.toISOString(),
            updatedAt: comment.updatedAt.toISOString(),
            user : {
                ...comment.user,
                createdAt: comment.user.createdAt.toISOString(),
                updatedAt: comment.user.updatedAt.toISOString(),
            }
        })
    );

    return safeComment;
    } catch(error: any) {
        throw new Error(error);
    }
}