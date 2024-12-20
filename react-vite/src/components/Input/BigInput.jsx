import "./Input.css";
function BigInput({value, setValue, required = false}){
    return(
        <textarea className={"BigInput"} required={required} value={value} onChange={(e)=>{setValue(e.target.value)}} />
    )
}

export default BigInput;