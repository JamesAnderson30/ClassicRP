import avatar from "../../../../media/default-user.png";
function PostUser({post}){
    if(post){
        return (
            <>
                <div>
                    {post.username}
                </div>
                <img className="Avatar" src={avatar} />
            </>
        )
    }
}

export default PostUser;
