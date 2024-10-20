import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecentTopics } from "../../redux/topic";
import { recentPosts } from "../../redux/post";
import Loading from "../loading";
import TopicListItem from "../Topics/TopicListItem";
import './Latest.css'
import PostListItem from "../Posts/PostListItem";

function LatestTopics(){
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)
    const [topics, setTopics] = useState([])
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        
        async function getRecent(){
            let result = await dispatch(getRecentTopics())
            if(result.length) setTopics(result)
            let resultPost = JSON.parse(await dispatch(recentPosts()))
            if(resultPost.length) setPosts(resultPost)

        }
        if(!isLoaded){
            console.log("getting")
            getRecent();
            setIsLoaded(true)
        }
    }, [isLoaded])

    return(
        <div className="sideBySide">
            <div className="Latest" id="LatestTopics">
                {isLoaded && topics.map((topic, idx)=>{
                    return (
                        <TopicListItem topic={topic} />
                    )
                })}
                {!isLoaded && <Loading />}
            </div>
            <div className="Latest" id="LatestPosts">
                {isLoaded && posts.map((post, idx)=>{
                    return (
                        <PostListItem post={post} />
                    )
                })}
                {!isLoaded && <Loading />}
            </div>
        </div>
    )
}

export default LatestTopics;