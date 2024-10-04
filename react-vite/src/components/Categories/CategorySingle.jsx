import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCategories } from "../../redux/category";
import { getCategoryTopics } from "../../redux/topic";
import { useParams } from "react-router-dom";

import Loading from "../loading";
import TopicList from "../Topics/TopicList";


function CategorySingle(){
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()
    const categories = useSelector(state => state.category.categories)
    const topicList = useSelector(state => state.topic.topics.byCategoryId);

    const {id} = useParams();

    //const categories = useSelector((store) => store.category.categories);


    useEffect(()=>{

        async function loadPage(){
            await dispatch(getCategoryTopics(id))
            if(!categories.byId[id]){
                await dispatch(getCategories())
            }
            setIsLoaded(true);
        }
        if(!isLoaded){
            loadPage()
        }
    }, [dispatch, isLoaded])

    if(!isLoaded){ return (
        <Loading />
    )} else {


    return (
            <div className="TopicList">
                <TopicList topic_list={topicList} category_id={id} />
            </div>
        )
    }
}

export default CategorySingle;
