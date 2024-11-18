import { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../redux/user";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './UserPage.css';

function UserPage(){
    const {id} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPostHidden, setIsPostHidden] = useState(true)
    const [isTopicHidden, setIsTopicHidden] = useState(false)
    const [isProfileHidden, setIsProfileHIdden] = useState(true)
    //Open source loading clip-art
    const [avatar, setAvatar] = useState("https://openclipart.org/download/311354/1544136002.svg")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{       
        console.log("is loaded: ", isLoaded)
        async function fetchUser(id) {
            console.log("fire: ", id)
            let res = await dispatch(getUser(id))
            if(res !== false){
                setIsLoaded(true);
            } else {
                navigate("/")
            }
            
        }
        if(!isLoaded)fetchUser(id)
    }, [dispatch])

    function hideAll(){
        setIsPostHidden(true);
        setIsTopicHidden(true);
        setIsProfileHIdden(true);
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
                        topicNumber
                        postNumber
                        timeCreated
                    </div>
                </div>
                <div id="UserDescription">
                    description
                </div>
                <div id="UserMediaList">
                    <div id="UserMediaPicker">
                        <button onClick={(e)=>{showInfo('topics',e)}}>View My Topics</button>
                        <button onClick={(e)=>{showInfo('posts',e)}}>View My Posts</button>
                        <button onClick={(e)=>{showInfo('profiles',e)}}>View My Profiles</button>
                    </div>
                    <div className="userMedia" hidden={isTopicHidden}>
                        myTopics
                    </div>
                    <div className="userMedia" hidden={isPostHidden}>
                        myPosts
                    </div>
                    <div className="userMedia" hidden={isProfileHidden}>
                        myProfile
                    </div>
                </div>
            </div>
        )
}

export default UserPage;
