import prisma from "@/app/libs/prismadb"

interface IParams {
    commentId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getComments(
    params: IParams
) {
    try{
    const { commentId,  userId, authorId} = params;

    const query: any = {};

    if(commentId) {
        query.commentId = commentId; 
    }

    if(userId){
        query.userId =userId
    }

    const comments = await prisma.comment.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    const safeComment = comments.map(
        (comment) => ({
            ...comment,
            createdAt: comment.createdAt.toISOString(),
            updatedAt: comment.updatedAt.toISOString(),
            
        })
    );

    return safeComment;
    } catch(error: any) {
        throw new Error(error);
    }
}