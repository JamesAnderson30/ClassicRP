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
        function dateStringToEpoch(dateString) {
            const date = new Date(dateString);
            return date.getTime() / 1000; // Divide by 1000 to get seconds
          }
          
          const epochTime = dateStringToEpoch(topic.created_at);
          console.log("time: ", epochTime) 
        return (
            <>
            <div id="TopicHeader">
                <div className="TopicMain">
                    <h4>{subject}</h4>
                    {body}
                </div>
                <div className="TopicOwner">
                    {topic.username}
                    {(topic.topic_specific_profile_picture && topic.topic_specific_profile_picture == "default") ? 
                    <img className="Avatar" src={topic.user_profile_picture} /> :
                    <img className="Avatar" src={topic.topic_specific_profile_picture} />}
                    
                </div>
                <div className="TopicDetails">
                    {(Date.now() / 1000) - topic.created_at}
                    <hr/>
                    {topic.created_at}
                    <hr/>
                    {Date.now()}
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
