import prisma from "@/app/libs/prismadb"

interface IParams {
    carId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(
    params: IParams
) {
    try{
    const { carId,  userId, authorId} = params;

    const query: any = {};

    if(carId) {
        query.carId = carId; 
    }

    if(userId){
        query.userId =userId
    }

    if(authorId) {
        query.car = {userId: authorId}
    }

    const reservations = await prisma.reservation.findMany({
        where: query,
        include: {
            car: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const safeReservation = reservations.map(
        (reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            car: {
                ...reservation.car,
                createdAt: reservation.car.createdAt.toISOString()
            }
        })
    );

    return safeReservation;
    } catch(error: any) {
        throw new Error(error);
    }
}