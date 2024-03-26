'use client'
import { useRouter } from "next/navigation";
import { SafeComment, SafeUser } from "@/app/types";
import { useCallback, useState } from "react";
import Container from "../components/Container";
import Avatar from "../components/Avatar";

import CommentInput from "../components/inputs/CommentInput";
import Heading from "../components/Heading";
interface CommentClientProps{
    comments: SafeComment[],
    currentUser: SafeUser | null, 
    disabled?: boolean;
}
const CommentClient: React.FC<CommentClientProps> = ({
    comments,
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
        />
        <div className="mt-6 flex flex-col w-full gap-4">
        {comments?.map((comment) => {
            return(
                <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
                <div className="w-full bg-gray-200 rounded-lg">
                    <div className="flex flex-col gap-3">
                        <div className="mx-8 my-2 text-xl font-semibold flex flex-row items-center gap-2">
                            <Avatar src={currentUser?.image} />
                            <div> {currentUser?.name}</div>
                    
                        </div>
                        <div className="mx-8 flex flex-row items-center gap-2 font-light text-black">
                            <div>{comment.message}</div>
                            <hr />
                    
                        </div>
                    </div>
                </div>
                </div>
            )
        })}

        </div>
      </Container>
    );
}
export default CommentClient