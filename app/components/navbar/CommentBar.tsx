import { SafeComment, SafeUser } from "@/app/types";
import Avatar from "../Avatar";
interface CommentBarProps{
    user: SafeUser 
    comments: SafeComment 
}
const CommentBar: React.FC<CommentBarProps> = ({
    user,
    comments
}) => {
    return(
         <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
                <div className="w-full bg-gray-200 rounded-lg">
                    <div className="flex flex-col gap-3">
                        <div className="mx-8 my-2 text-xl font-semibold flex flex-row items-center gap-2">
                            <Avatar src={user.image} />
                            <div> {user.name}</div>
                    
                        </div>
                        <div className="mx-8 flex flex-row items-center gap-2 font-light text-black">
                            <div>{comments.message}</div>
                            <hr />
                    
                        </div>
                    </div>
                </div>
                </div>
    )
}
export default CommentBar;