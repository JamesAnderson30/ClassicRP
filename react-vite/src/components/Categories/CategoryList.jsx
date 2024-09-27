import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCategories } from "../../redux/category";
import Loading from "../loading";
import CategoryListComponent from "./CategoryListComponent";

function CategoryList(){
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()
    const categories = useSelector((store) => store.category.categories);

    useEffect(()=>{
        if(!isLoaded){
            dispatch(getCategories())
            setIsLoaded(true);
        }
    }, [dispatch, isLoaded])

    if(!isLoaded) return (
        <Loading />
    )
    console.log("Categories: ", categories)
    return (
        <div className="CategoryList">
        {
            categories.map((category, idx)=>{
                return (
                    <CategoryListComponent key={category.name+idx} category={category} />
                )
            })
        }
        </div>
    )
}

export default CategoryList;
