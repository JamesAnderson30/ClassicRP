import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { sendPost } from "../../../redux/post";
import { useDispatch } from "react-redux";
import { getTopic, registerProfile } from "../../../redux/topic";
function NewPostForm({topic_id}){
    const user = useSelector(state=> state.session.user);
    const topics = useSelector((store) => store.topic.topics);
    const [isDisabled, setIsDisabled] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [showSignupForm, setShowSignUpForm] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);
    const [topicProfiles, setTopicProfiles] = useState([])
    const [errors] = useState([])
    const [errorsHidden, setErrorsHidden] = useState(true)
    const dispatch = useDispatch()
    // New Post form variables
    const [body, setBody] = useState("");
    const [profilePick, setProfilePick] = useState("none")

    // Sign up form variables
    const [aName, setaName] = useState("");
    const [aBody, setaBody] = useState("");
    const [aColor, setaColor] = useState("");
    const [aAvatar, setaAvatar] = useState("");
    
    function handleShowFormButton(){
        setShowForm(!showForm)
        setShowSignUpForm(false);
    }
    
    function handleShowSignupButton(){
        setShowSignUpForm(!showSignupForm)
        setShowForm(false);
    }

    // Handle NEW POST submit
    let handleSubmit = async (e) =>{
        e.preventDefault()
        let profileId;
        if(profilePick == "none") profileId = null;
        else profileId = profilePick;

        let newErrors = []
        if(body.length < 1) newErrors.push("Post body cannot be empty!")
        if(newErrors.length > 1) setErrorsHidden(false);
        else {
            setErrorsHidden(true)
            await dispatch(sendPost({body, topic_id, user, 'topic_profile_id': profileId}))
            setBody("")
            let element = document.querySelector('.PostBody:last-of-type')
            element.scrollIntoView()
        }
    }

    let handleSignupSubmit = async (e) =>{
        e.preventDefault()
        let profile = {aBody, topic_id, aName, aColor, aAvatar, user}
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
        console.log('useEffect', topicProfiles)
    }, [dispatch, topicProfiles, isLoaded,topics])
    
    if(isLoaded){
        
        return(
                <>
                    <button onClick={(e)=>handleShowFormButton(e)}>Make a new post!</button>
                    <button onClick={(e)=>handleShowSignupButton(e)}>                                
                        {topics.byId[topic_id].privacy_level == 2 && "Submit character application"}
                        {topics.byId[topic_id].privacy_level < 2 && "Submit character profile"}
                    </button>

                    {showForm && 
                    <form onSubmit={handleSubmit}>

                        <input type="hidden" name="topic_id" value={topic_id} />
                        <label>
                            Author a new Post: 
                            <textarea value={body} onChange={(e)=>setBody(e.target.value)} />
                        </label>
                        <select value={profilePick} id="profilePicker" onChange={(e)=>setProfilePick(e.target.value)}>
                            <option value="none">None (User profile)</option>
                            {topicProfiles.map((profile)=>{
                                if(profile.user_id == user.id) return <option key={profile.id} value={profile.id}>{profile.name}</option>
                            })}
                        </select>
                        <button disabled={isDisabled} type="submit">Post!</button>
                        <span hidden={errorsHidden}>{errors.map((error)=>{return <span>{error}</span>})}</span>
                    </form>
                    }
                    {/* Because the new post and the profile sign up forms have very similar inputs
                    we will prepend 'a' to the names of the controlled input variables */}
                    {showSignupForm && 
                        <form onSubmit={handleSignupSubmit}>
                            <input type="hidden" name="topic_id" value={topic_id} />
                            <label>Character Name:</label>
                            <input required type="text" value={aName} onChange={(e)=>setaName(e.target.value)} />
                            <br/>

                            <label>Character Description: </label>
                            <input  required type="text" value={aBody} onChange={(e)=>setaBody(e.target.value)} />
                            <br/>

                            <label>Outline Color</label>
                            <select value={aColor} onChange={(e)=>setaColor(e.target.value)} >
                                <option value={"orange"}>Orange</option>
                                <option value={"blue"}>Blue</option>
                                <option value={"yellow"}>Yellow</option>
                                <option value={"green"}>Green</option>
                                <option value={"brown"}>Brown</option>
                            </select>
                            <br/>

                            <label>Character avatar (External URL for now)</label>
                            <input  required type="text" value={aAvatar} onChange={(e)=>setaAvatar(e.target.value)} />
                            <button type="submit">Post!</button>
                            <span hidden={errorsHidden}>{errors.map((error)=>{return <span>{error}</span>})}</span>
                        </form>
                    }
                    
                </>
        )
    }

}

export default NewPostForm;
