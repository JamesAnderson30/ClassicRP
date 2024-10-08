
import { useState } from "react";
import NewTopicForm from "./Forms/NewTopicForm";
import TopicListItem from "./TopicListItem";

function TopicList(topics){
    console.log("Topics: ", topics)
    const [topic_list, setTopic_list] = useState(topics.topic_list[topics.category_id])
    const [category_id, setCategory_id] = useState(topics.category_id)


    return (
        <>
            <NewTopicForm category_id={category_id} />
            {topic_list.map((topic, idx)=>{
                return(<TopicListItem key={idx} topic={topic} />)
            })}
        </>
    )
}

export default TopicList;
