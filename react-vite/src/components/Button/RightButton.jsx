function RightButton({text, callback}){
    return(
        <button class="RightButton" onClick={(e)=>{callback()}}>
            {text}
        </button>
    )
}

export default RightButton