import prisma from "@/app/libs/prismadb"


export default async function getUsers() {
    try{
   

    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    const safeUser = users.map(
        (user) => ({
            ...user,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            
        })
    );

    return safeUser;
    } catch(error: any) {
        throw new Error(error);
    }
}