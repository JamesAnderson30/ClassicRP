function LeftButton({text, callback}){
    return(
        <button className="LeftButton button" onClick={(e)=>{callback()}}>
            {text}
        </button>
    )
}

export default LeftButton