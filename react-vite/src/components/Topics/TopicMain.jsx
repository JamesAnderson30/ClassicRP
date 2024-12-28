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
//https://forumweb.hosting/876-what-is-the-best-forum-template-have-you-ever-seen.html4
function TopicMain(){
    const {id} = useParams();
    const topic = useSelector(state => state.topic.topics.byId[id]);
    const post = useSelector(state=> state.post.posts.all);
    const user = useSelector(state=> state.session.user);
    const [isTopicLoaded, setIsTopicLoaded] = useState(false);
    const [body, setBody] = useState('');
    const [subject, setSubject] = useState('');
    const [isPostLoaded, setIsPostLoaded] = useState(false);
    const [timeSeconds, setTimeSeconds] = useState("")
    const [allowPost, setAllowPost] = useState(false)
    const uNavigate = useNavigate()

    function getTimeFormated(times){
        let time = Math.trunc(times);
        let unit = "";
        let number = 0;
        if(time < 60){
            return `less than a minute ago`
        } else if(time < 3600){
            number = Math.trunc(time / 60);
            unit = "minute";
        } else if (time < 86400){
            number = Math.trunc(time / 3600);
            unit = "hour";
        } else if (time < 604800){
            number = Math.trunc(time/86400);
            unit = "day";
        } else if (time < 2419200) {
            number = Math.trunc(time/604800);
            unit = "week";
        } else if (time < 29030400) {
            number = Math.trunc(time / 2419200);
            unit = "month";
        } else {
            number = Math.trunc(time / 29030400)
            unit = "year";
        }
        // Ternary just adds an 's' for plural
        return `Posted ${number} ${(number === 1 ? unit : `${unit}s`)} ago`
    }

    const dispatch = useDispatch();

    function setTopic({body, subject}){
        setBody(body);
        setSubject(subject);
    }
    
    let OuterContainer = document.getElementById("OuterContainer");
    let InnerContainer = document.getElementById("InnerContainer")
    OuterContainer.className = "large";
    OuterContainer.style.backgroundImage = 'unset'; 
    InnerContainer.className = "large"

    function cleanUp(){
        OuterContainer.className = "smol"
        OuterContainer.style.backgroundImage = 'url("/media/paper.jpg")'; 
        InnerContainer.className = "smol"

    }

    useEffect(()=>{
        return cleanUp
    }, [])



    // if id is null or undefined, should throw error
    //check if post list is stale
    useEffect(()=>{
        let getTopicThunk = async (id) => {
            //Just scroll function
            if(await dispatch(getTopic(id))){
                setIsTopicLoaded(true)
                setBody(topic.body);
                setSubject(topic.subject);
                setTimeSeconds(getTimeFormated(Math.trunc((Date.now() / 1000) - topic.created_at)))               
                if(location.hash.length > 0){
                    let hash = location.hash
                    let target_post = document.getElementById(hash.substring(1))
                    target_post.scrollIntoView()
                    console.log("target_post: ", target_post);
                    //target_post.scrollIntoView();
                } else {
                    console.log("else: ", location.hash)
                }
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
                    <h3 className="">{subject}</h3>

                    {body}
                </div>
                <div className="TopicOwner">
                    {topic.username}
                    {(topic.topic_specific_profile_picture && topic.topic_specific_profile_picture == "default") ? 
                    <img className="Avatar" src={topic.user_profile_picture} /> :
                    <img className="Avatar" src={topic.topic_specific_profile_picture} />}
                    
                </div>
                <div className="TopicDetails">
                    {timeSeconds}
                    <br/>
                    {topic.privacy_level == 0 && "Anyone can post"}
                    {topic.privacy_level == 1 && "Only users with profiles may post"}
                    {topic.privacy_level == 2 && "Only approved users may post"}
                </div>
                <hr />
                <div className="TopicUser">

                </div>
                {user != null && topic && user.id == topic.user_id && <TopicListUsertControl setTopic={setTopic} topic={topic} />}
            </div>
            {/* NEW POST FORM/BUTTON */}
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
