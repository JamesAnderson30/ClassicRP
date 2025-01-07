import { NavLink } from "react-router-dom";

function BigLink({url,text,extraClass = ""}){
    return(
        <NavLink to={url} className={`BigLink ${extraClass}`}><span>{text}</span></NavLink>
    )
}

export default BigLink;