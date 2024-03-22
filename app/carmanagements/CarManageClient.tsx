'use client'
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeCar, SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CarCard from "../components/cars/CarCard";
interface CarManageClientProps{
    cars: SafeCar[];
    currentUser?: SafeUser | null
}


const CarManageClient: React.FC<CarManageClientProps> = ({
    cars,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

 //   const [updatingId, setUpdatingId] = useState('');
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/cars/${id}`)
        .then(() => {
            toast.success('Đã xóa xe khỏi danh sách');
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
                title= "Xe"
                subtitle="Danh sách xe của bạn"
            />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {cars.map((car) => (
                    <CarCard 
                        key = {car.id}
                        data = {car}
                        actionId={car.id}
                        onAction={onCancel}
                        disabled= {deletingId === car.id}
                        actionLabel="Xóa"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}
export default CarManageClient;