import prisma from "@/app/libs/prismadb"


export default async function getAllReserve() {
    try{
   

    const reservations = await prisma.reservation.findMany({
        orderBy: {
            startDate: 'asc'
        },
        include: {
            car: true,
            user: true,
        }
    });

    const safeReserve = reservations.map(
        (reservation) => ({
            ...reservation,
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            createdAt: reservation.createdAt.toISOString(),
            car: {
                ...reservation.car,
                createdAt: reservation.car.createdAt.toISOString(),
            },
            user: {
                ...reservation.user,
                createdAt: reservation.user.createdAt.toISOString(),
                updatedAt: reservation.user.updatedAt.toISOString(),
            }
        })
    );

    return safeReserve;
    } catch(error: any) {
        throw new Error(error);
    }
}