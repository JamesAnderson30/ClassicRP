import { useState } from "react";
import Loading from '../loading'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTopic } from "../../redux/topic";
import { getPosts } from "../../redux/post";
import NewPostForm from "../Posts/Forms/NewPost";
import TopicPosts from "../Posts/TopicPosts";
function TopicMain(){
    const {id} = useParams();
    const [isTopicLoaded, setIsTopicLoaded] = useState(false);

    const [isPostLoaded, setIsPostLoaded] = useState(false);
    const topic = useSelector(state => state.topic.topics.byId[id]);
    const user = useSelector(state=> state.session.user);
    const dispatch = useDispatch();

    // if id is null or undefined, should throw error
    //check if post list is stale
    useEffect(()=>{
        let getTopicThunk = async (id) => {
            await dispatch(getTopic(id))
            setIsTopicLoaded(true)
        }
        let getPostThunk = async (id) => {
            await dispatch(getPosts(id))
            setIsPostLoaded(true)
        }

        if(!isTopicLoaded){
            getTopicThunk(id)

        }
        if(!isPostLoaded){
            getPostThunk(id)
        }

    }, [dispatch, isTopicLoaded, isPostLoaded])

    if(!isTopicLoaded){
        return(
            <Loading />
        )
    } else {

        return (
            <>
            <div id="TopicHeader">
                {user != null && "<TopicControls topic={topic} />"}
                <div className="TopicSubject">
                    {topic.subject}
                </div>
                <div className="TopicUser">
                    username stuff
                </div>
            </div>
            <hr />
            {user != null && <NewPostForm topic_id={id} />}
            <div id="TopicPosts">
                {isPostLoaded && <TopicPosts posts={topic.Posts} />}
                {isPostLoaded || <Loading />}
            </div>
            </>
        )
    }
}

export default TopicMain;
