import avatar from "../../../../media/default-user.png";
import NoStyleLink from "../../Link/NoStyleLink";
function PostUser({post}){

    if(typeof post.Topic_Profile === "undefined"){
        return (
            <div className="PostUserArea">
                <span className="littleArrowLeft"></span>
                <img className="Avatar" src={avatar} />
                <div className="userName">
                    {post.username}
                </div>
            </div>
        )
    } else {
        return(
            <div className="PostUserArea">
                <span className="littleArrowLeft"></span>
                <img className="Avatar" src={post.Topic_Profile.avatar} />
                <div className={"userName"}>
                    {post.Topic_Profile.name}
                </div>
                <div className="suppressedText">
                    {post.username}
                </div>
            </div>
        )
    }
}

export default PostUser;
