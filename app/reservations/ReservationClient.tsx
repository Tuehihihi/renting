'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "../types";
import CarCard from "../components/cars/CarCard";
import Heading from "../components/Heading";
import Container from "../components/Container";
import { useCallback, useState } from "react";

interface ReservationClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}
const ReservationsClient: React.FC<ReservationClientProps>= ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() =>{
            toast.success("Hủy thành công");
            router.refresh
        })
        .catch(() => {
            toast.error('Hỏng');
        })
        .finally(()=>{
            setDeletingId('');
        })
    },[router]);
    return (
     <Container>
        <Heading 
            title="Xe đã đặt"
            subtitle="Các xe đã đặt trong hệ thống"
        />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {reservations.map((reservation) => (
                <CarCard
                key={reservation.id}
                data={reservation.car}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                actionLabel="Hủy xe khách"
                currentUser={currentUser}
                />
            ))}

        </div>
     </Container>
    )
}
export default ReservationsClient;