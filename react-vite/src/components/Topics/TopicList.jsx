
import { useState } from "react";
import TopicListItem from "./TopicListItem";

function TopicList(topics){
    const [topic_list] = useState(topics.topic_list[topics.category_id])

    return (
        <>
            {topic_list.map((topic, idx)=>{
                return(<TopicListItem key={idx} topic={topic} />)
            })}
        </>
    )
}

export default TopicList;
