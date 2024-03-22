'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";


interface HeartButtonProps {
    carId: string;
    currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
    carId,
    currentUser
}) => {
    const { hasFavorited,toggleFavorite } = useFavorite({
        carId,
        currentUser
    })
    return (
        <div  onClick = {toggleFavorite}
         className="relative hover:opacity-80 transition cursor-pointer">
            <AiOutlineHeart
            size={24}
            className="fill-white  absolute -top-[2px] -right-[2px]" />
            <AiFillHeart size={20}
             className={hasFavorited ? 'fill-rose-500' : ' fill-neutral-500/70'} 
             />
        </div>
    )
}
export default HeartButton;