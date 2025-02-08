function LeftButton({text, callback, extraClass=""}){
    return(
        <button className={`LeftButton button ${extraClass}`} onClick={(e)=>{callback()}}>
            {text}
        </button>
    )
}

export default LeftButton