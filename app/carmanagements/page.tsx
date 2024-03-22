import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";

import CarManageClient from "./CarManageClient";
import getCars from "../actions/getCars";
const CarManagementPage = async () => {
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
    const cars = await getCars({
        userId: currentUser.id
    });
    if(cars.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Không có danh sách xe"
                    subtitle="Vui lòng thêm xe!"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <CarManageClient 
                cars = {cars}
                currentUser = {currentUser}
            />
        </ClientOnly>
    )
}

export default CarManagementPage;