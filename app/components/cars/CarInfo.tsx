'use client';

import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";

import Avatar from "../Avatar";
import CarCategory from "./CarCategory";
import Input from "../inputs/Input";
import { useState } from "react";
interface CarInfoProps {
    user: SafeUser;
    description: string;
    guestCount: number;
    seatCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string
    } | undefined
    locationValue: string;
}

const CarInfo: React.FC<CarInfoProps> = ({
    user,
    description,
    guestCount,
    seatCount,
    category,
    locationValue
}) => {
    
    return (
     <div className="col-span-4 flex flex-col gap-5">
        <div className="flex flex-col gap-5">
            <div className="text-xl font-semibold flex flex-row items-center gap-2">
                <div>Chủ sở hữu {user?.name}</div>
                <Avatar src={user?.image} />
                
            </div>
            <div className="flex flex-row items-center gap-2 font-light text-neutral-500">
                <div>{seatCount} Chỗ</div>
                <div>{guestCount} Khách</div>
            </div>
        </div>
        {category && (
            <CarCategory 
                icon ={category.icon}
                label = {category.label}
                description = {category.description}
            />
        )}
        <hr />
        <div className="text=lg font-light text-neutral-500">
            {description}            
        </div>
        <hr />
        
     </div>
    )
}
export default CarInfo;