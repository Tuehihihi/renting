import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from "react-hot-toast";
import { SafeUser } from '../types';
import useLoginModal from './useLoginModal';

interface IUseFavorite {
    carId: string;
    currentUser?: SafeUser | null
}

const useFavorite = ({
    carId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        
        return list.includes(carId)
    }, [currentUser,carId]);

    const toggleFavorite = useCallback(async(
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if(!currentUser){
            return loginModal.onOpen();
        }
        try{
            let request;

            if(hasFavorited) {
                request = () => axios.delete(`/api/favorites/${carId}`);
            }
            else {
                request = () => axios.post(`api/favorites/${carId}`);
            }

            await request();
            router.refresh();
            toast.success('Thành công');

        }catch(error){
            toast.error('Hỏngggg');
        }
    },[
        currentUser,
        hasFavorited,
        carId,
        loginModal,
        router
    ]);

    return{
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;