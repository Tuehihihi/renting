import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    paymentId?: string;
};

export async function DELETE (
    request: Request,
    {params} : {params: IParams}
){
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const {paymentId} = params;
    if(!paymentId || typeof paymentId !== 'string'){
        throw new Error('Id không tồn tại');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: paymentId,
        }
        
    });
    return NextResponse.json(reservation);
}

