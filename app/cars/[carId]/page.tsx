
import getCarById from "@/app/actions/getCarById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getReservations from "@/app/actions/getReservations";
import CarClient from "./CarClient";
interface IParams {
    carId?:string;
}

const CarPage = async({params}: {params: IParams}) => {
    const car = await getCarById(params);
    const reservations = await getReservations(params)
    const currentUser = await getCurrentUser();

    if(!car) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <CarClient 
                car = {car}
                reservations={reservations}
                currentUser = {currentUser}
            />
        </ClientOnly>
    );
}
export default CarPage