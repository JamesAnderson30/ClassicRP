import { useState } from "react";
import Loading from '../loading'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTopic } from "../../redux/topic";
import { getPosts } from "../../redux/post";
import NewPostForm from "../Posts/Forms/NewPost";
import TopicPosts from "../Posts/TopicPosts";
import TopicListUsertControl from "./Components/TopicUserControl";
import topicStyling from './Topic.module.css'

function TopicMain(){
    const {id} = useParams();
    const topic = useSelector(state => state.topic.topics.byId[id]);
    const post = useSelector(state=> state.post.posts.all);
    const user = useSelector(state=> state.session.user);
    const [isTopicLoaded, setIsTopicLoaded] = useState(false);
    const [body, setBody] = useState('');
    const [subject, setSubject] = useState('');
    const [isPostLoaded, setIsPostLoaded] = useState(false);
    const [timeSeconds, setTimeSeconds] = useState(0)
    const uNavigate = useNavigate()
    


    const dispatch = useDispatch();

    function setTopic({body, subject}){
        setBody(body);
        setSubject(subject);
    }
    
    let OuterContainer = document.getElementById("OuterContainer");
    let InnerContainer = document.getElementById("InnerContainer")
    OuterContainer.className = "large";
    InnerContainer.className = "large"

    function cleanUp(){
        OuterContainer.className = "smol"
        InnerContainer.className = "smol"
    }

    useEffect(()=>{
        return cleanUp
    }, [])



    // if id is null or undefined, should throw error
    //check if post list is stale
    useEffect(()=>{
        let getTopicThunk = async (id) => {
            if(await dispatch(getTopic(id))){
                setIsTopicLoaded(true)
                setBody(topic.body);
                setSubject(topic.subject);
                setTimeSeconds(Math.trunc((Date.now() / 1000) - topic.created_at))
            } else {
                uNavigate('/')
            }
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
                <div className="TopicMain">
                    <h3>{subject}</h3>
                    <hr/>
                    {body}
                </div>
                <div className="TopicOwner">
                    {topic.username}
                    {(topic.topic_specific_profile_picture && topic.topic_specific_profile_picture == "default") ? 
                    <img className="Avatar" src={topic.user_profile_picture} /> :
                    <img className="Avatar" src={topic.topic_specific_profile_picture} />}
                    
                </div>
                <div className="TopicDetails">
                </div>
                <hr />
                <div className="TopicUser">

                </div>
                {user != null && topic && user.id == topic.user_id && <TopicListUsertControl setTopic={setTopic} topic={topic} />}
            </div>
            {user != null && <NewPostForm topic_id={id} />}
            <div id="TopicPosts">
                {isPostLoaded && topic && topic.Posts && <TopicPosts posts={topic.Posts} />}
                {isPostLoaded || <Loading />}
            </div>
            </>
        )
    }
}

export default TopicMain;
