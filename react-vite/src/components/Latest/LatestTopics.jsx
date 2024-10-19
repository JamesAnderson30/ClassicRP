import { useEffect } from "react";
import { useSelector } from "react-redux";

function LatestTopics(){
    const topicState = useSelector(state=>state)
    useEffect(()=>{
        console.log("topicState: ", topicState)
    }, [])

    return(
        <div className="Latest" id="LatestTopics">

        </div>
    )
}

export default LatestTopics;