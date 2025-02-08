import { useEffect, useState } from "react";
import { useRef } from "react";
import "./Input.css";
function BigInput({value, setValue, required = false, extraClass = ""}){
    const [height, setHeight] = useState("");
    const myRef = useRef(null);
    function handleChange(e){
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
        setValue(e.target.value);
    }

    useEffect(()=>{
        setHeight(myRef.current.scrollHeight);
        console.log("bleh: ", `${myRef.current.scrollHeight}px`)
    },[])

    return(
        <textarea ref={myRef} className={`BigInput ${extraClass}`} style={{height:`${height}px`}} required={required} value={value} onChange={(e)=>{handleChange(e)}} />
    )
}

export default BigInput;