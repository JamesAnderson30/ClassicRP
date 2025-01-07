import "./Input.css";
function BigInput({value, setValue, required = false, extraClass = ""}){
    return(
        <textarea className={`BigInput ${extraClass}`} required={required} value={value} onChange={(e)=>{setValue(e.target.value)}} />
    )
}

export default BigInput;