import prisma from "@/app/libs/prismadb";

export interface ICarsParams {
    userId?: string;
    guestCount?: number;
    seatCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getCars(
    params: ICarsParams
) {
    const {
        userId,
        guestCount,
        seatCount,
        startDate,
        endDate,
        locationValue,
        category
    } = params
    try{
        const { userId} = params;
        let query: any = {};

        if(userId) {
            query.userId = userId;
        }

        if(category) {
            query.category = category;
        }

        if(guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }
        if(seatCount) {
            query.seatCount = {
                gte: +seatCount
            }
        }

        if(locationValue) {
            query.locationValue = locationValue;
        }

        if( startDate && endDate) {
            query.NOT ={
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: {gte: startDate},
                                startDate: {lte: endDate},
                            },
                            {
                                startDate: {lte: endDate},
                                endDate: {gte: startDate},
                            }
                        ]
                    }
                }
            }
        }
        const cars = await prisma?.car.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });
        const safeCars = cars?.map((car) => ({
            ...car,
            createdAt: car.createdAt.toISOString(),
        }));
        return safeCars;
    }catch(error: any){
        throw new Error(error);
    }

}