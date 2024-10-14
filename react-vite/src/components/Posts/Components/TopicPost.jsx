import { useState } from "react"
import PostBody from "./PostBody"
import { useSelector } from "react-redux"
import PostUserControls from "./PostUserControls";
import PostUser from "./PostUser";
import "./Post.css";

function TopicPost(id){
    const byIdStart = useSelector((state) => state.post.posts.byId);
    const user = useSelector(state=> state.session.user);
    const [post, setPost] = useState(byIdStart[id.id]);
    console.log("Post: ", post);
    console.log("user Id: " , user.id)
    if(byIdStart[id.id]){
        //get user status
        return (
            <div className="PostBody">
                <div className="UserArea">
                    <PostUser post={post} />
                    {user && post && user.id == post.user_id && <PostUserControls setPost={setPost} post={post} />}
                </div>
                <div className="PostArea">
                    <PostBody post={post} />
                </div>
            </div>
        )
    }
}

export default TopicPost;
