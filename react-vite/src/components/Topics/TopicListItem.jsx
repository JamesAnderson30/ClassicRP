import { NavLink } from "react-router-dom";

function TopicListItem({topic}){
    return (
        <div className="topicLine">
            <div className="topicLineSubject">
                <NavLink to={`/topic/${topic.id}`} >{topic.subject} </NavLink>
            </div>
            <div className="topicLineBottom">
                {topic.body}
            </div>
        </div>
    )
}

export default TopicListItem;
