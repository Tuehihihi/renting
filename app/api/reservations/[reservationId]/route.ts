import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string;
};

export async function DELETE (
    request: Request,
    {params} : {params: IParams}
){
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const {reservationId} = params;
    if(!reservationId || typeof reservationId !== 'string'){
        throw new Error('Id không tồn tại');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {userId:currentUser.id},
                {car: {userId: currentUser.id}}
            ]
        }
        
    });
    return NextResponse.json(reservation);
}

export async function PUT (
    request: Request,
    {params} : {params: IParams}
){
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const {reservationId} = params;
    if(!reservationId || typeof reservationId !== 'string'){
        throw new Error('Id không tồn tại');
    }

    
    const reservation = await prisma.reservation.update({
        where: {
            id: reservationId,
        },
        data: {
            takeLocation: "Ha Noi o de"
        }
    })
    
    return NextResponse.json(reservation);
}