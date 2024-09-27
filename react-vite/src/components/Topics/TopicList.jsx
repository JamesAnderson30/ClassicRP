import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCategories } from "../../redux/category";
import { useParams } from "react-router-dom";
import { getCategoryTopics } from "../../redux/topic";
import Loading from "../loading";


function TopicList(){
    const [isLoaded, setIsLoaded] = useState(false);
    const [topicList, setTopicList] = useState([])
    const dispatch = useDispatch()

    const {id} = useParams();
    //const categories = useSelector((store) => store.category.categories);

    useEffect(()=>{
        if(!isLoaded){
            dispatch(getCategoryTopics(id))
            setIsLoaded(true);
        }
    }, [dispatch, isLoaded])

    if(!isLoaded) return (
        <Loading />
    )
    return (
        <div className="TopicList">

        </div>
    )
}

export default TopicList;
