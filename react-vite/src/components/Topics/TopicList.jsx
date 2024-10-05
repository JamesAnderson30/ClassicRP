
import NewTopicForm from "./Forms/NewTopicForm";
import TopicListItem from "./TopicListItem";

function TopicList(topics){
    let {topic_list, category_id} = topics
    return (
        <>
            <NewTopicForm category_id={category_id} />
            {topic_list[category_id].map((topic, idx)=>{
                return(<TopicListItem key={"topic"+idx} topic={topic} />)
            })}
        </>
    )
}

export default TopicList;
