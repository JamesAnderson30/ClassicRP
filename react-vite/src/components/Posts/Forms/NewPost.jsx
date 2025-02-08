import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { getPosts, sendPost } from "../../../redux/post";
import { useDispatch } from "react-redux";
import { getTopic, registerProfile } from "../../../redux/topic";
import './NewPost.css'
import BigInput from "../../Input/BigInput";
import ColorPicker from "../../Picker/ColorPicker";
function NewPostForm({topic_id}){
    const user = useSelector(state=> state.session.user);
    const topics = useSelector((store) => store.topic.topics);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false);
    const [topicProfiles, setTopicProfiles] = useState([])
    const [errors] = useState([])
    const [errorsHidden, setErrorsHidden] = useState(true)
    const dispatch = useDispatch()
    // New Post form variables
    const [showForm, setShowForm] = useState(false);
    const [body, setBody] = useState("");
    const [profilePick, setProfilePick] = useState("none")
    const [profileName, setProfileName] = useState(user.username)
    let userAvatar = user.profilePicture;
    const [profileAvatar, setProfileAvatar] = useState(userAvatar)
    const [postColor, setPostColor] = useState("default")

    // Sign up form variables
    const [aName, setaName] = useState("");
    const [aBody, setaBody] = useState("");
    const [aColor, setaColor] = useState("");
    const [aAvatar, setaAvatar] = useState("");
    const [showSignupForm, setShowSignUpForm] = useState(false)

    // color array
    
      
    
    function handleShowFormButton(){
        setShowForm(!showForm)
        setShowSignUpForm(false);
    }
    
    function handleShowSignupButton(){
        setShowSignUpForm(!showSignupForm)
        setShowForm(false);
    }

    function handleProfilePick(e){
        setProfilePick(e.target.value);
        // Get profile name of the selected profile
        let profile = topics.byId[topic_id].Topic_Profiles.find((profile)=>profile.id == e.target.value);
        let avatar = ""
        if(profile == undefined){
            profile = {'name':user.username};
            avatar = user.profilePicture
        } else {
            avatar = profile.avatar
        }
        setProfileAvatar(avatar);
        setProfileName(profile.name)
    }

    // Handle NEW POST submit
    let handleSubmit = async (e) =>{
        e.preventDefault()
        let profileId;
        if(profilePick == "none") profileId = null;
        else profileId = profilePick;

        let newErrors = []
        if(body.length < 1) newErrors.push("Post body cannot be empty!")
        if(postColor == "Pick a Color!") newErrors.push("Pick a color")
        if(newErrors.length > 1) setErrorsHidden(false);
        else {
            setErrorsHidden(true)
            await dispatch(sendPost({body, topic_id, user, postColor, 'topic_profile_id': profileId}))
            await dispatch(getPosts(topic_id))
            setBody("")
            let element = document.querySelector('.PostBody:last-of-type')
            element.scrollIntoView()
            //setShowForm(false)
        }
    }

    let handleSignupSubmit = async (e) =>{
        e.preventDefault()
        let profile = {'body': aBody, topic_id, 'name': aName, 'color': aColor, 'avatar': aAvatar, user}
        let res = await dispatch(registerProfile(profile, topic_id));
        if(res){
            setaBody("")
            setaName("")
            setaColor("")
            setaAvatar("")
            setShowSignUpForm(false);
            if(topics.byId[topic_id].privacy_level == 2) alert("Once your profile has been approved by the topic author, you may make new posts using this profile");
            else alert("You may now start posting with this profile");
            await dispatch(getTopic(topic_id));
        }

    }

    useEffect(()=>{
        if(body.length > 0) setIsDisabled(false)
        else setIsDisabled(true)
    }, [dispatch, body])

    useEffect(()=>{
        
        async function loadTopic(id){
            await dispatch(getTopic(id))
            
        }
        if(!isLoaded){
            if (typeof topics === 'undefined' || typeof topics.byId[topic_id] === 'undefined') {
                loadTopic(topic_id)

                setIsLoaded(true)
            } else {
                setIsLoaded(true)
            }
        } 
        setTopicProfiles(topics.byId[topic_id].Topic_Profiles)
    }, [dispatch, topicProfiles, isLoaded,topics])
    
    if(isLoaded){
        
        return(
                <><div className={"NewPostButtons spaceContents beigeBorder"}>
                    <div className={"squeeze spaceContents"}>
                        <button onClick={(e)=>handleShowFormButton(e)}>Make a new post!</button>
                        <button onClick={(e)=>handleShowSignupButton(e)}>                                
                            {topics.byId[topic_id].privacy_level == 2 && "Submit character application"}
                            {topics.byId[topic_id].privacy_level < 2 && "Submit character profile"}
                        </button>
                    </div>
                    
                    {showForm && 
                    <>
                        <h2>Submit a new post:</h2>
                        <form id="newPostForm" onSubmit={handleSubmit}>

                            <div className="postAvatarPreview">
                                <input type="hidden" name="topic_id" value={topic_id} />
                                <span>Avatar preview</span>
                                <img className="Avatar" src={profileAvatar} />
                            </div>

                            <div className="postProfilePicker">
                                <label>
                                    Posting as {profileName}
                                    <select value={profilePick} id="profilePicker" onChange={(e)=>handleProfilePick(e)}>
                                        <option value="none">None (User profile)</option>
                                        {topicProfiles.map((profile)=>{
                                            if(profile.user_id == user.id) return <option key={profile.id} name={profile.name} value={profile.id}>{profile.name}</option>
                                        })}
                                    </select>
                                </label>
                                <ColorPicker value={postColor} callBack={setPostColor(e.target.value)} />
                                <button id="postButton" disabled={isDisabled} type="submit">Post!</button>
                            </div>
                            
                            <div className="postBodyArea beigeBorder">
                                <input type="hidden" name="topic_id" value={topic_id} />
                                    {/* <textarea value={body} onChange={(e)=>setBody(e.target.value)} /> */}
                                    <BigInput value={body} setValue={setBody} />
                                
                            </div>
                            
                        </form>
                    </>
                    }
                    {/* Because the new post and the profile sign up forms have very similar inputs
                    we will prepend 'a' to the names of the controlled input variables */}
                    {showSignupForm && 
                        <form id="newProfileForm" onSubmit={handleSignupSubmit}>
                            <input type="hidden" name="topic_id" value={topic_id} />

                            <label>Character Name:</label>
                            <input required type="text" value={aName} onChange={(e)=>setaName(e.target.value)} />

                            <label>Outline Color</label>
                            <select value={aColor} onChange={(e)=>setaColor(e.target.value)} >
                                <option value={"orange"}>Orange</option>
                                <option value={"blue"}>Blue</option>
                                <option value={"yellow"}>Yellow</option>
                                <option value={"green"}>Green</option>
                                <option value={"brown"}>Brown</option>
                            </select>
                            
                            <label>Character avatar</label>
                            <input  required type="text" value={aAvatar} onChange={(e)=>setaAvatar(e.target.value)} />

                            <label>Character Description: </label>
                            <textarea  required type="text" value={aBody} onChange={(e)=>setaBody(e.target.value)} />

                            <button className="button" type="submit">Post!</button>
                            <span hidden={errorsHidden}>{errors.map((error)=>{return <span>{error}</span>})}</span>
                        </form>
                    }
                    </div>
                </>
        )
    }

}

export default NewPostForm;
