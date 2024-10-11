import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCategories } from "../../redux/category";
import { getCategoryTopics } from "../../redux/topic";
import { useParams } from "react-router-dom";
import NewTopicForm from "../Topics/Forms/NewTopicForm";
import Loading from "../loading";
import TopicList from "../Topics/TopicList";


function CategorySingle(){
    const [isLoaded, setIsLoaded] = useState(false);
    const user = useSelector(state=> state.session.user);
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
                <div className="CategorySingle">
                    <div className="CategoryHeader">
                        <div className="CategoryName">
                            <h3>{categories.byId[id].name}</h3>
                        </div>
                        <div className="CategoryDescription">
                            {categories.byId[id].description}
                        </div>
                    </div>
                    {user != null && <NewTopicForm category_id={id} />}
                    <div className="TopicList">
                        <TopicList topic_list={topicList} category_id={id} />
                    </div>
                </div>
        )
    }
}

export default CategorySingle;
