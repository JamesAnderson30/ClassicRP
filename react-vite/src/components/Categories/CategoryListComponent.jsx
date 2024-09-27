import { useState } from "react"

import { useDispatch } from "react-redux";
function CategoryListComponent(category){
    let cat = category.category
    return (
        <div className="CategoryListComponent">
            <div className="CategoryName">{cat.name}</div>
            <div className="CategoryDescription">{cat.description}</div>
        </div>
    )
}

export default CategoryListComponent;
