'use client';

import { SafeCar, SafeReservation, SafeUser } from "@/app/types";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';

import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
interface CarPaymentProps {
    data: SafeCar;
    reservation?: SafeReservation;
    onAction?: (id:string) => void;
   user: SafeUser
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
   
    currentUser?: SafeUser | null;
}

const CarPayment: React.FC<CarPaymentProps>= ({
    data,
    reservation,
    onAction,
    disabled,
    user,
    actionLabel,
    
    actionId = "",
   
    currentUser
}) => {

    const router = useRouter();
    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) =>{
            e.stopPropagation();

            if(disabled) {
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled]
    )

    
    const price = useMemo(() => {
        if(reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if(!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    },[reservation]);
    return(
     
        <div onClick={() => {}}
         className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-1 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image 
                    fill
                    alt = "Car"
                    src={data.imageScr}
                    className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton 
                            carId = {data.id}
                            currentUser = {currentUser}
                        />

                    </div>
                </div>
                <div className="font-semibold text-[15px]">
                    {!reservation && (
                        <div>{data.locationValue}</div>
                     )}
                    {reservation && (
                    <div className="flex flex-col">
                        <div>{user.phoneNumber}</div>
                        <div>{reservation.takeLocation}</div>
                    </div>
                        
                    )}
                    </div>

                <div className="font-light text-neutral-500 text-[12px]">
                    {/* cais nayf laf show reservationDate hoac category nhung o day reservationDate ko co nen ko hien */}
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        đ {price}
                    </div>
                    <div >
                        {!reservation && (
                            <div className="font-light">/ ngay</div>
                        )}
                    </div>
                </div> 
                <div className="flex flex-row gap-3">
                {onAction && actionLabel && (
                        <Button
                        disable = {disabled}
                        small
                        outline
                        label={actionLabel}
                        onClick={handleCancel}
                        />
                        
                    )}
                
                </div>
            </div>
         </div>
    )
}
export default CarPayment;