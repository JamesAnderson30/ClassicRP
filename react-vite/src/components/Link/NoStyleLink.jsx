import { NavLink } from "react-router-dom";

function NoStyleLink({url,text,extraClass = ""}){
    return(
        <NavLink to={url} className={"NoStyleLink ".extraClass}>{textx}</NavLink>
    )
}

export default NoStyleLink;