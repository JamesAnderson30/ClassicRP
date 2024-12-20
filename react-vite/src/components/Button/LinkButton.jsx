import { NavLink } from "react-router-dom";
import "./button.css"

function LinkButton({callback, label, url, classNameVar}){
    return (
        <NavLink to={url}><button className={`button ${classNameVar}`} onClick={(e)=>{callback(e)}}>{label}</button></NavLink>
    )
}

export default LinkButton