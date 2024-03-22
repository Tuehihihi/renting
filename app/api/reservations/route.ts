import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        carId,
        startDate,
        endDate,
        takeLocation,
        totalPrice
    } = body;

    if(!carId || !startDate || !endDate || !takeLocation || !totalPrice) {
        return NextResponse.error();
    }

    const carAndReservation = await prisma.car.update({
        where:{
            id: carId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    takeLocation,
                    totalPrice
                }
            }
        }
    });

    return NextResponse.json(carAndReservation);
}