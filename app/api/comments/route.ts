import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error()
    }

    const body = await request.json();

    const{
        message
    } = body;

    if(!message){
        return NextResponse.error();
    }

    const messageSubmit = await prisma.comment.create({
        data: {
            message,
            userId: currentUser.id,
        }
    }) ;

    return NextResponse.json(messageSubmit)
}