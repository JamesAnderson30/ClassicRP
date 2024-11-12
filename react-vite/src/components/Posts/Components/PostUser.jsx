import avatar from "../../../../media/default-user.png";
function PostUser({post}){
    if(typeof post.Topic_Profile === "undefined"){
        return (
            <div className="PostUserArea">

                <div>
                    {post.username}
                </div>
                <img className="Avatar" src={avatar} />
            </div>
        )
    } else {
        return(
            <div className="PostUserArea">

                <div>
                    {post.Topic_Profile.name}
                </div>
                <img className="Avatar" src={post.Topic_Profile.avatar} />
            </div>
        )
    }
}

export default PostUser;
