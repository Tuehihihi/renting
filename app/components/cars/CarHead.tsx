'use client';

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface CarHeadProps {
    title: string;
    locationValue: string;
    imageScr: string;
    id: string;
    currentUser?: SafeUser | null
}

const CarHead: React.FC<CarHeadProps> = ({
    title,
    locationValue,
    imageScr,
    id,
    currentUser,
}) => {
    
    return (
        <>
        <Heading 
            title={title}
            subtitle={locationValue}
        />
        <div className="w-full h-[85vh] overflow-hidden rounded-xl relative">
            <Image 
            alt="image"
            src={imageScr}
            fill
            className="object-cover w-full"
            />
            <div className="absolute top-5 right-5">
                <HeartButton 
                    carId={id}
                    currentUser={currentUser}
                />
            </div>
        </div>
        </>
    );
}
export default CarHead;