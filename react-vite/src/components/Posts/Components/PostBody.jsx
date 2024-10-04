import { useSelector } from "react-redux";

function PostBody({post}){
    if(post){
        return (
            <h3>{post.body}</h3>
        )
    }
}

export default PostBody;
