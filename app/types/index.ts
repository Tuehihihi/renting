import { Car,Reservation,User } from "@prisma/client";

export type SafeCar = Omit<
    Car,
    "createdAt"
> & {
    createdAt: string;
}

export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "car"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    car: SafeCar;
}

export type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string |null;
}