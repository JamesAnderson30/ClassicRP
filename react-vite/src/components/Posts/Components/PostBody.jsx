
function PostBody({post}){
    if(post){
        return (
            <span className="Body">{post.body}</span>
        )
    }
}

export default PostBody;
