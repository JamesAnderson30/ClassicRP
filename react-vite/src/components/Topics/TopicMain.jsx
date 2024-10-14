import { useState } from "react";
import Loading from '../loading'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTopic } from "../../redux/topic";
import { getPosts } from "../../redux/post";
import NewPostForm from "../Posts/Forms/NewPost";
import TopicPosts from "../Posts/TopicPosts";
import TopicListUsertControl from "./Components/TopicUserControl";

function TopicMain(){
    const {id} = useParams();
    const topic = useSelector(state => state.topic.topics.byId[id]);
    const post = useSelector(state=> state.post.posts.all)
    const user = useSelector(state=> state.session.user);
    const [isTopicLoaded, setIsTopicLoaded] = useState(false);
    const [body, setBody] = useState('');
    const [subject, setSubject] = useState('');
    const [isPostLoaded, setIsPostLoaded] = useState(false);
    console.log("post: ", post);
    const dispatch = useDispatch();


    function setTopic({body, subject}){
        setBody(body);
        setSubject(subject);
    }



    // if id is null or undefined, should throw error
    //check if post list is stale
    useEffect(()=>{
        let getTopicThunk = async (id) => {
            await dispatch(getTopic(id))
            setIsTopicLoaded(true)
            setBody(topic.body);
            setSubject(topic.subject);
        }
        let getPostThunk = async (id) => {
            await dispatch(getPosts(id))
            setIsPostLoaded(true)
        }

        if(!isTopicLoaded)getTopicThunk(id)
        if(!isPostLoaded)getPostThunk(id)

    }, [dispatch, isTopicLoaded, isPostLoaded, topic])
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
                    <h4>{subject}</h4>
                </div>
                <hr />
                <div className="TopicMain">
                    {body}
                </div>
                <hr />
                <div className="TopicUser">
                    Author: {topic.username}
                </div>
                {user != null && user.id == topic.user_id && <TopicListUsertControl setTopic={setTopic} topic={topic} />}
            </div>
            <hr />
            {user != null && <NewPostForm topic_id={id} />}
            <div id="TopicPosts">
                {isPostLoaded && topic.Posts && <TopicPosts posts={topic.Posts} />}
                {isPostLoaded || <Loading />}
            </div>
            </>
        )
    }
}

export default TopicMain;
