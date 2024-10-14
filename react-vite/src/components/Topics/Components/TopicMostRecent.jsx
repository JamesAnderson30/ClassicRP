import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../loading";
import { getRecentTopics } from "../../../redux/topic";

function TopicMostRecent(){
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)
    const [topics, setTopics] = useState([]);

    useEffect(()=>{
        if(!isLoaded){
            setTopics(dispatch(getRecentTopics()))
        }

    }, [dispatch])

    if(!isLoaded) return <Loading />

}

export default TopicMostRecent;
