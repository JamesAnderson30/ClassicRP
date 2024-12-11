import { useState } from "react"
import PostBody from "./PostBody"
import { useSelector } from "react-redux"
import PostUserControls from "./PostUserControls";
import PostUser from "./PostUser";
import "./Post.css";

function TopicPost(id){
    id = id.id.substring(4); // We expect the id to be 'post1' so we just want the number
    const byIdStart = useSelector((state) => state.post.posts.byId);
    const user = useSelector(state=> state.session.user);
    const [post, setPost] = useState(byIdStart[id]);

    
    
    if(byIdStart[id]){
        //get user status
        return (
            <div id={`post${id}`} className="PostBody">
                <div className="UserArea">
                    <PostUser post={post} />
                    {user && post && user.id == post.user_id && <PostUserControls setPost={setPost} post={post} />}
                </div>
                <div className="PostInfo">
                    {post && new Date(post.created_at).toLocaleString()}
                </div>
                <div className="PostArea">
                    <PostBody post={post} />
                </div>
            </div>
        )
    }
}

export default TopicPost;
