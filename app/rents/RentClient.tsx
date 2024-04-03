'use client'
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CarCard from "../components/cars/CarCard";
interface RentsClientProps{
    reservations: SafeReservation[];
    currentUser?: SafeUser | null
}


const RentsClient: React.FC<RentsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');  


    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Hủy thành công');
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setDeletingId('');
        });
    },[router])
    
    return (
        <Container>
            <Heading
                title= "Thuê"
                subtitle="Bạn đã thuê những xe gì rồi?"
            />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {reservations.map((reservation) => (
                    <CarCard 
                        key = {reservation.id}
                        data = {reservation.car}
                        reservation={reservation}
                        user={currentUser}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled= {deletingId === reservation.id}
                        actionLabel="Hủy"
                        currentUser={currentUser}
                        
                    />
                ))}
            </div>
        </Container>
    );
}
export default RentsClient;