import { useSelector } from "react-redux";

function PostBody(post){
    if(post){
        return (
            <h2>{post.body}</h2>
        )
    }
}

export default PostBody;
