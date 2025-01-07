import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCategories } from "../../redux/category";
import Loading from "../loading";
import CategoryListComponent from "./CategoryListComponent";
import CategoryListBox from "../List/CategoryListBox";
import { countTopics } from "../../redux/topic";

function CategoryList(){
    const [isLoaded, setIsLoaded] = useState(false);
    const [count, setCount] = useState("A lot of ");
    const dispatch = useDispatch()
    const categories = useSelector((store) => store.category.categories);

    useEffect(()=>{
        async function fetchCategories(){
            dispatch(getCategories())
            let countRes = await dispatch(countTopics());
            if(typeof countRes != undefined)setCount(countRes)
            else setCount("A lot of ");
            setIsLoaded(true);
        }
        if(categories.all.length < 1){
            fetchCategories();
        }
    }, [dispatch, categories])

    if(categories.all.length < 1) return (
        <Loading />
    )

    return (
        <div>
            <span>
                <h3 className="noBottomMargin">
                    Browse topics by category
                </h3>
                <div className="suppressedText">{`${count} topics posted so far!`}</div>
            </span>
            <CategoryListBox list={categories.all} />
        </div>
    )
}

export default CategoryList;
