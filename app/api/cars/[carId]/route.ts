import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    carId?: string,
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error()
    }

    const { carId } = params;

    if(!carId || typeof carId !== 'string'){
        throw new Error('Id không tồn tại');

    }
    const car = await prisma.car.deleteMany({
        where: {
            id: carId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(car);
}