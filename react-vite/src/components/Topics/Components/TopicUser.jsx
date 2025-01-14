import avatar from "../../../../media/default-user.png";
import NoStyleLink from "../../Link/NoStyleLink";
function TopicUser({topic}){

        return (
            <div className="PostUserArea">
                <span className="littleArrowLeft"></span>
                <img className="Avatar" src={avatar} />
                <div className="userName">
                    {topic.username}
                </div>
            </div>
        )
}

export default TopicUser;
