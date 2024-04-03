'use client'
import { useRouter } from "next/navigation";
import { SafeComment, SafeUser } from "@/app/types";
import { useCallback, useMemo, useState } from "react";
import Container from "../components/Container";
import Avatar from "../components/Avatar";

import CommentInput from "../components/inputs/CommentInput";
import Heading from "../components/Heading";
import CommentBar from "../components/navbar/CommentBar";
interface CommentClientProps{
    comments: SafeComment[],
    currentUser: SafeUser | null, 

    disabled?: boolean;
}
const CommentClient: React.FC<CommentClientProps> = ({
    comments = [],
    currentUser,
    disabled,
}) => {
    
    return( 
      <Container>
        <Heading 
        title="Bình luận"
        subtitle="Hãy đánh giá dịch vụ của chúng tôi"
        />
        <CommentInput 
            comments={comments}
            currentUser={currentUser}
            disabled = {disabled}
        />
        <div className="mt-6 flex flex-col w-full gap-4">
        {comments?.map((comment) => {
            return(
                <CommentBar 
                    comments = {comment}
                    user = {comment.user}
                />
               
            )
        })}

        </div>
      </Container>
    );
}
export default CommentClient