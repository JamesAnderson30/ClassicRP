import { NavLink } from "react-router-dom"
function PostListItem({post}){

    return (
        <div key={`${post.id}${post.body.substring(0,3)}`} className="topicLine">

            <div className="topicLineSubject">
                <NavLink to={`/topic/${post.topic_id}`} >{post.Topic.subject.substring(0, 50)}... </NavLink>
            </div>
            <div className="topicLineBottom">
                {post.body.substring(0, 50)}
                <br></br>
                By: {post.username}
            </div>
        </div>
    )
}

export default PostListItem