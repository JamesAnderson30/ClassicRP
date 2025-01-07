import { NavLink } from "react-router-dom";
import "./Topic.css"
import read from "../../../media/read-paper.png";
import unread from "../../../media/unread-paper.png";
import { useState } from "react";

//It would be fun to make a function that stores all images in one place and you just call it to get what you want? I don't know

function TopicListItem({topic}){
    const [visited, setVisited] = useState(false);
    const visit = (e) => {
        e.preventDefault();
        setVisited(true)}
    return (
        <div key={`${topic.id}${topic.subject.substring(0,3)}`} className="topicLine">
            {visited}
            {topic.visited && <img src={read} className="readImg" />}
            {!topic.visited && <img src={unread} className="readImg" />}
            <div className="topicLineSubject" onClick={(e) => visit(e)}>
                <NavLink to={`/topic/${topic.id}`} >{topic.subject} </NavLink>
            </div>
            <div className="topicLineBottom">
                {topic.body}
            </div>
        </div>
    )
}

export default TopicListItem;
