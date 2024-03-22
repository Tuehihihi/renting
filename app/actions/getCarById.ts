import prisma from "@/app/libs/prismadb";

interface IParams {
    carId?: string;
}

export default async function getCarById(
    params: IParams
) {
    try{
        const {carId} = params;

        const car = await prisma.car.findUnique({
            where: {
                id: carId
            },
            include: {
                user: true
            }
        });
        if(!car){
            return null;
        }

        return {
            ... car,
            createdAt: car.createdAt.toISOString(),
            user: {
                ...car.user,
                createdAt: car.user.createdAt.toISOString(),
                updatedAt: car.user.updatedAt.toISOString(),
                emailVerified:
                    car.user.emailVerified?.toISOString() ||null,
            }
        };
    } catch(error: any){
        throw new Error(error);
    }
}