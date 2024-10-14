
import { NavLink } from "react-router-dom";

function CategoryListComponent(category){
    let cat = category.category
    return (
        <div className="CategoryListComponent">
            <NavLink to={`/categories/${cat.id}`}>
                <div className="CategoryName">{cat.name}</div>
                <div className="CategoryDescription">{cat.description}</div>
            </NavLink>
        </div>
    )
}

export default CategoryListComponent;
