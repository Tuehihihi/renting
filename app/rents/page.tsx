import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import RentClient from "./RentClient";
const RentsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Chưa đăng nhập"
                    subtitle="Đăng nhập ngay"
                />
            </ClientOnly>
        )
    }
    const reservations = await getReservations({
        userId: currentUser.id
    });
    if(reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Không có danh sách thuê"
                    subtitle="Có vẻ bạn chưa thuê xe nào nhỉ!!!"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <RentClient 
                reservations = {reservations}
                currentUser = {currentUser}
            />
        </ClientOnly>
    )
}

export default RentsPage;