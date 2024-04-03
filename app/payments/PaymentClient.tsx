'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import { useCallback, useState } from "react";
import CarPayment from "../components/cars/CarPayment";

interface PaymentClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}
const PaymentClient: React.FC<PaymentClientProps>= ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/payments/${id}`)
        .then(() =>{
            toast.success("Thanh toán thành công");
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
            title="Các xe giao"
            subtitle="Hãy giao xe đến khách hàng!!!"
        />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {reservations.map((reservation) => (
                <CarPayment
                key={reservation.id}
                data={reservation.car}
                reservation={reservation}
                user={reservation.user}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                actionLabel="Xác nhận thanh toán"
                currentUser={currentUser}
                />
            ))}

        </div>
     </Container>
    )
}
export default PaymentClient;