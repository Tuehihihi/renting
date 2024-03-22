import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import FavoritesClient from "./FavoritesClient";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteCars from "../actions/getFavoriteCars";

const CarPage = async () => {

    const cars = await getFavoriteCars();
    const currentUser = await getCurrentUser();
    if(cars.length === 0){
    return(
        <ClientOnly>
            <EmptyState
                title="Không tìm thấy mục yêu thích"
                subtitle="Có vẻ không có xe nào mà bạn thích rồi :("
            />
        </ClientOnly>
    )
    }
    return(
        <ClientOnly>
            <FavoritesClient 
                cars = {cars}
                currentUser = {currentUser}
            />
        </ClientOnly>
    )
}

export default CarPage;