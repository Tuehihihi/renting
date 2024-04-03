import { Car,Reservation,User,Comment } from "@prisma/client";

export type SafeCar = Omit<
    Car,
    "createdAt"
> & {
    createdAt: string;
}
export type SafeComment = Omit<
    Comment,
    "createdAt" | "updatedAt"
>  & {
    createdAt: string;
    updatedAt: string;
    user: SafeUser;
}

export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "car" | "user"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    car: SafeCar;
    user: SafeUser;

}

export type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string |null;
}