import { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../redux/user";
import { getTheseTopics } from "../../redux/topic";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './UserPage.css';

function UserPage(){
    const {id} = useParams();
    const topics = useSelector(state => state.topic.topics);
    const posts = useSelector(state=> state.post.posts);
    const currentUser = useSelector(state=> state.session.user);
    const profiles = useSelector(state=> state.profile.profiles)
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPostHidden, setIsPostHidden] = useState(true)
    const [isTopicHidden, setIsTopicHidden] = useState(false)
    const [isProfileHidden, setIsProfileHIdden] = useState(true)
    const [showLabel, setShowLabel] = useState(true);

    const [username, setUsername]= useState('loading...')
    const [email, setEmail] = useState('loading...')
    const [formUsername, setFormUsername] = useState('')
    const [formEmail, setFormEmail] = useState('');
    const [formAvatar, setFormAvatar] = useState('')

    const [topicCount, setTopicCount] = useState(0)
    const [postCount, setPostCount] = useState(0)
    const [profileCount, setProfileCount] = useState(0)

    //Open source loading clip-art
    const [avatar, setAvatar] = useState("https://openclipart.org/download/311354/1544136002.svg")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //EVENT HANDLERS

    // END EVENT HANDLERS
    function checkPostTopicRelationships(){
        let loadTheseTopics = new Set();
        for(let [post_id, post] of Object.entries(posts.byId)){
            if(topics.byId[post.topic_id] == undefined){
                loadTheseTopics.add(post.topic_id)
            }
        }

        if(loadTheseTopics.size > 0){
            console.log(dispatch(getTheseTopics(loadTheseTopics)));
        } else {
            console.log("nogo");
        }

    }

    useEffect(()=>{       
        async function fetchUser(id) {
            let res = await dispatch(getUser(id))
            if(res !== false){
                console.log("res: ", res)
                setIsLoaded(true);
                setAvatar(res.profilePicture);
                setTopicCount(res.Topics.length);
                setPostCount(res.Posts.length);
                setProfileCount(res.Topic_Profiles.length);
                setUsername(res.username);
                setEmail(res.email)
                setFormUsername(res.username);
                setFormEmail(res.email)
                setFormAvatar(res.profilePicture)

                checkPostTopicRelationships();
            } else {
                navigate("/")
            }
        }
        if(!isLoaded)fetchUser(id)
    }, [dispatch, isLoaded])

    useEffect(()=>{
        setIsLoaded(false)
    }, [id])

    function hideAll(){
        setIsPostHidden(true);
        setIsTopicHidden(true);
        setIsProfileHIdden(true);
    }
    function showEditForm(e){
        e.preventDefault();
        e.stopPropagation();
        setShowLabel(!showLabel)
    }
    function showInfo(target, e){
        e.stopPropagation();
        e.preventDefault();
        hideAll();
        switch(target){
            case 'topics':
                setIsTopicHidden(false);
                break;
            case 'posts':
                setIsPostHidden(false);
                break;
            case 'profiles':
                setIsProfileHIdden(false);
                break;
        }
    }

    
    if(!isLoaded){
        return (
            <>Loading</>
        )
    }
        return (
            <div className="UserPage">
                <div id="AvatarStats">
                    <img src={avatar} />
                    <div id="UserStats">
                        {`Topics Posted: ${topicCount}`}<br/>{`Posts Posted: ${postCount} `}<br/>{` Profiles Created: ${profileCount}`}
                    </div>
                </div>
                <div id="UserProfileInfo">
                    <button onClick={(e)=>{showEditForm(e)}}>Edit my information</button>
                    <form>
                        <div id="UserUsername">
                            <p>
                                Username: {showLabel && username}
                                <input value={formUsername} onChange={(e)=>{setFormUsername(e.target.value)}} hidden={showLabel} />
                            </p>
                        </div>
                        <div id="UserEmail">
                            <p>
                                Email: {showLabel && email}
                                <input value={formEmail} hidden={showLabel} onChange={(e)=>{setFormEmail(e.target.value)}}/>
                            </p>
                        </div>
                        <div id="UserAvatar">
                            {!showLabel && <p>
                                Avatar image URL: <input value={formAvatar} onChange={(e)=>{setFormAvatar(e.target.value)}} />
                            </p>}
                        </div>

                        {!showLabel &&
                        <button onClick={(e)=>handleEditSubmit(e.target.value)}>Submit Changes</button>
                        }
                    </form>
                </div>
                <div id="UserMediaList">
                    <div id="UserMediaPicker">
                        <button onClick={(e)=>{showInfo('topics',e)}}>View My Topics</button>
                        <button onClick={(e)=>{showInfo('posts',e)}}>View My Posts</button>
                        <button onClick={(e)=>{showInfo('profiles',e)}}>View My Profiles</button>
                    </div>
                    {/* USER TOPICS */}
                    <div className="userMedia item" hidden={isTopicHidden}>
                        {Object.keys(topics.byId).map((key)=>{
                            let topic = topics.byId[key]
                            if(topic.user_id == id){
                                return (
                                    <div key={`topicId${topic.id}`} onClick={(e)=>{navigate(`/topic/${topic.id}`)}} className="userTopic">
                                        <div>
                                            {topic.subject}
                                        </div>
                                        <div>
                                            {topic.body}
                                        </div>
                                    </div>
                                )
                            } 
                        })}
                    </div>
                    {/* USER POSTS */}
                    <div className="userMedia item" hidden={isPostHidden}>
                    {Object.keys(posts.byId).map((key)=>{
                            let post = posts.byId[key]
                            //console.log("topics.byId[post.topic_id]", topics.byId[post.topic_id])
                            if(post.user_id == id){
                                return (
                                    <div key={`postId${post.id}`} onClick={(e)=>{navigate(`/topic/${post.topic_id}#post${post.id}`)}} className="userPost">
                                        <div className="userPostHeader">
                                            {topics.byId[post.topic_id] !== undefined && "Found"}
                                            {topics.byId[post.topic_id] !== undefined || "Not Found"}
                                        </div>
                                        
                                        <div className="userPostBody">
                                            {post.body}
                                        </div>
                                    </div>
                                )
                            } 
                        })}
                    </div>
                    {/* USER PROFILES */}
                    <div className="userMedia" hidden={isProfileHidden}>
                        {Object.keys(profiles).map((key)=>{
                                let profile = profiles[key]
                                if(profile.user_id == id){
                                    return (
                                        <div key={`profileId${profile.id}`} onClick={(e)=>{navigate(`/topic/${profile.topic_id}`)}} className="userProfile item">
                                            <div>
                                                {profile.name}
                                            </div>
                                            <div>
                                                {profile.body}
                                            </div>
                                        </div>
                                        
                                    )
                                } 
                            })}
                    </div>
                </div>
            </div>
        )
}

export default UserPage;
