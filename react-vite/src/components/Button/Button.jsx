function Button({text, callBack, extraClass=""}){
    console.log("text: ", text)
    console.log("callBack: ", callBack)
    return(
        <button className={`button ${extraClass}`} onClick={(e)=>{callBack(e)}}>
            {text}
        </button>
    )
}

export default Button