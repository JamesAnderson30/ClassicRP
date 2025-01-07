import BigLink from "../Link/BigLink"
import "./List.css";
import "./CategoryList.css";
function CategoryListBox({list, extraClass="", prefixExtraClass=""}){
    return(
        <div className={"TopicListBox ".extraClass}>
            {list.map((item, i)=>{
                return(
                    <div className={`ListBoxItem ListItem${item.name}`}>
                        <span className={"prefixGraphic ".prefixExtraClass}></span>
                        <BigLink text={item.name} extraClass="ListItemLink" url={`/categories/${item.id}`}></BigLink><span className="ListText"> - {item.description}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default CategoryListBox;