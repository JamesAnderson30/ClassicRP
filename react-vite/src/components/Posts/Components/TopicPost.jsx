import { useState } from "react"
import PostBody from "./PostBody"
import { useSelector } from "react-redux"
import PostUserControls from "./PostUserControls";

function TopicPost(id){
    const byIdStart = useSelector((state) => state.post.posts.byId);
    const user = useSelector(state=> state.session.user);
    const [post, setPost] = useState(byIdStart[id.id]);
    if(byIdStart[id.id]){


        //get user status
        return (
            <>
                post
                <PostBody post={post} />
                {user && post && user.id == post.user_id && <PostUserControls setPost={setPost} post={post} />}
            </>
        )
    }
}

export default TopicPost;
