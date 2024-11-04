import avatar from "../../../../media/default-user.png";
function PostUser({post}){
    if(post){
        return (
            <div className="PostUserArea">

                <div>
                    {post.username}
                </div>
                <img className="Avatar" src={avatar} />
            </div>
        )
    }
}

export default PostUser;
