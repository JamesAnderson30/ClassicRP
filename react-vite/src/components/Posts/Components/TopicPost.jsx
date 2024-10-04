import { useState } from "react"
import PostBody from "./PostBody"
import { useSelector } from "react-redux"
import PostUserControls from "./PostUserControls";

function TopicPost(id){
    const byId = useSelector((state) => state.post.posts.byId);
    //get user status
    const user = useSelector(state=> state.session.user);

    if(byId[id.id]){
        let post = byId[id.id];
        return (
            <>
                post
                <PostBody post={post} />
                {user && user.id == post.user_id && <PostUserControls post={post} />}
            </>
        )
    }
}

export default TopicPost;
