import { NavLink } from "react-router-dom"
import './Tile.css';
function Tile({header, body, img, footer, link, key}){
    return(
        <a href={link}>
            <div className={"tile"} key={key}>

                {header && 
                    <div className="tileSubject">
                        {header}
                    </div>
                }
                
                {body && 
                    <div className="tileBody">
                        {body}
                    </div>
                }

                {img && 
                    <div className="tileImg">
                        <img src={img}></img>
                    </div>
                }

                {footer &&
                    <div className="tileFooter">
                        {footer}
                    </div>
                }

            </div>
        </a>
    )
}

export default Tile;