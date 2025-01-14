function Button({text, callBack, extraClass=""}){

    return(
        <button className={`button ${extraClass}`} onClick={(e)=>{callBack(e)}}>
            {text}
        </button>
    )
}

export default Button