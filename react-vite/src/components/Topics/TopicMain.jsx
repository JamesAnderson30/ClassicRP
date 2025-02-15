import { useState } from "react";
import Loading from '../loading'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { editTopic, getTopic, storeTopics } from "../../redux/topic";
import { getPosts } from "../../redux/post";
import NewPostForm from "../Posts/Forms/NewPost";
import TopicPosts from "../Posts/TopicPosts";
import TopicListUsertControl from "./Components/TopicUserControl";
import topicStyling from './Topic.module.css'
import Button from "../Button/Button";
import DeleteConfirmButton from "../Button/DeleteConfirmButton";
import BigInput from "../Input/BigInput";
import { deleteTopic } from "../../redux/topic";
import TopicPost from "../Posts/Components/TopicPost";
//https://forumweb.hosting/876-what-is-the-best-forum-template-have-you-ever-seen.html4
function TopicMain(){
    const {id} = useParams();
    const topic = useSelector(state => state.topic.topics.byId[id]);
    const post = useSelector(state=> state.post.posts.all);
    const postById = useSelector(state=> state.post.posts.byId)
    const user = useSelector(state=> state.session.user);
    const [isTopicLoaded, setIsTopicLoaded] = useState(false);
    const [body, setBody] = useState('');
    const [subject, setSubject] = useState('');
    const [isPostLoaded, setIsPostLoaded] = useState(false);
    const [timeSeconds, setTimeSeconds] = useState("")
    const [allowPost, setAllowPost] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const postList = post.filter((p) => p.topic_id == id)

    // Conversation maker
    let conversations = new Map()

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

    function showEditForm(){
        setIsEditing(!isEditing);
    }

      async function handleEdit(e){
            e.preventDefault();
            let response = await dispatch(editTopic({body, id, subject}))
            console.log("response: ", response)
            if(response){
                storeTopics([{...topic, body, id}]);
                setIsEditing(false);
            } else {
                alert("Your topic could not be edited");
            }
    }

    function handleDelete(){
        dispatch(deleteTopic(topic))
        uNavigate(`/categories/${topic.category_id}`)
    }
    
    let OuterContainer = document.getElementById("OuterContainer");
    let InnerContainer = document.getElementById("InnerContainer")
    OuterContainer.className = "large";
    OuterContainer.style.backgroundImage = 'unset'; 
    InnerContainer.className = "large"

    function cleanUp(){
        OuterContainer.className = "smol"
        // OuterContainer.style.backgroundImage = 'url(https://i.ibb.co/bPvTK9t/background.png)'; 
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
            let res = await dispatch(getTopic(id))

            if(res){
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
        if(topic){
        return (
            <>
            <div className="TopicHeader">
                <h3>{subject}</h3>
                <div className="TopicDetails suppressedText">
                        {timeSeconds}
                        &#183;
                        {topic.privacy_level == 0 && "Anyone can post"}
                        {topic.privacy_level == 1 && "Only users with profiles may post"}
                        {topic.privacy_level == 2 && "Only approved users may post"}
                </div>
            </div>
            <div id="TopicHeader" className="beigeBorder">
                <div className="TopicMain">
                {!isEditing && <>{body}</>}
                {isEditing && <><BigInput value={body} extraClass="minusBigButton" setValue={setBody} required={true} />
                    <Button extraClass="wide littleMarginBottom bigButton" text="Submit Edits" callBack={handleEdit} />
                </>}
                </div>
                <div className="TopicOwner">
                    <span class="littleArrowLeft"></span>
                    
                    {(topic.topic_specific_profile_picture && topic.topic_specific_profile_picture == "default") ? 
                    <img className="Avatar" src={topic.user_profile_picture} /> :
                    <img className="Avatar" src={topic.topic_specific_profile_picture} />}
                    <div className="userName">{topic.username}</div>
                </div>

                {/* IF THE USER OWNS THE TOPIC, LET THEM EDIT OR DELETE THE TOPIC */}
                {user != null && topic && user.id == topic.user_id && 
                    <div className="TopicUserControls">
                        <div className="squeeze spaceContents">
                            <Button text="Edit Topic" extraClass=""  callBack={showEditForm} />
                            <DeleteConfirmButton reverse={false} margin={false} deleteText="Delete Topic" callBack={handleDelete}/>
                        </div>
                    </div>
                }
            </div>
            {/* NEW POST FORM/BUTTON */}
            {user != null && <NewPostForm topic_id={id} />}
            {isPostLoaded && topic && topic.Posts && <div id="TopicPosts">
                {/* POSTS */}
                {
                    postList.map((post)=>{
                    //check if part of conversation
                    let conversation = null
                    if(post.replied_to){
                        if(postById[post.replied_to] && postById[post.replied_to].replied_to){
                            let replied_to = postById[post.replied_to].replied_to
                            while(postById[replied_to].replied_to){
                                if(postById[replied_to].replied_to)replied_to = postById[replied_to].replied_to
                                // else conversation = replied_to
                                
                            }
                            conversation = replied_to
                        } else {

                            conversation = postById[post.replied_to].id;
                        }
                    }
                    if(post) return (
                        <TopicPost conversation={conversation} id={`post${post.id}`} key={`post${post.id}`} />
                    )
                })}
            </div>}
            {isPostLoaded || <Loading />}
            </>
        )
    }
    }
}

export default TopicMain;
