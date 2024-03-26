'use client'
import { useRouter } from "next/navigation";
import { SafeComment, SafeUser } from "@/app/types";
import { useCallback, useState } from "react";
import Container from "../Container";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "../Avatar";
interface CommentInputProps{
    comments: SafeComment,
    currentUser: SafeUser | null, 
    disabled?: boolean;
}
const CommentInput: React.FC<CommentInputProps> = ({
    comments,
    currentUser,
    disabled,
}) => {
    const loginModal = useLoginModal()
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message,setMessage] = useState('');

    const onCreateComment = useCallback(() =>{
        if(!currentUser){
            return loginModal.onOpen();
        }

        setIsLoading(true);
        axios.post('/api/comments', {
            message,
            commentId: comments?.id
        })
        .then(()=> {
            toast.success('Gửi đánh giá');
            setMessage('');
            router.refresh();
        })
        .catch(() => {
            toast.error('Hỏng');
        })
        .finally(() =>{
            setIsLoading(false);
        })
    },[message, comments.id, loginModal])
    return(
       
            <div className="max-w-screen mx-auto">
                <div className="flex flex-row">
                    <input id="message" placeholder="Hãy cho chúng tôi biết bạn nghĩ gì..." 
                    className="peer w-full p-5 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed" 
                    onChange={(event) => setMessage(event.target.value)}
                    style={{ flex: 9 }}
                    />
                    <div style={{ flex: 1}} className="h-peer w-full p-5">
                    <Button 
                        onClick={onCreateComment}
                        label="Gửi"
                        
                        disable ={disabled}
                    />
                    </div>
                </div>
            </div> 
            
       
    );
}
export default CommentInput;