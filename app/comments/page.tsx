import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import CommentClient from "./CommentClient";
import getComments from "../actions/getComments";
const CommentPage = async() =>{
    const currentUser= await getCurrentUser();
    if(!currentUser) {
        return(
            <ClientOnly>
                <EmptyState
                    title="Chưa đăng nhập"
                    subtitle="Đăng nhập ngay"
                />
            </ClientOnly>
        );
    }

    const comments = await getComments({
        userId: currentUser.id
    });

    if(comments.length === 0){
        return(
            <ClientOnly>
                <EmptyState 
                    title="Không có đánh giá"
                    subtitle="Hãy cho chúng tôi biết suy nghĩ của bạn"
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <CommentClient
                comments={comments}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
};
export default CommentPage;