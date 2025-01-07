import { useEffect, useState } from "react"

function CopyMeInput({data, customInput = data ,callback = (e) => {return}, message = "Copied!"}){
    const [animationClass, setAnimationClass] = useState("hidden")
    function CopyMeHandle(e){
        navigator.clipboard.writeText(data)
        console.log(e.target)
        e.target.setCustomValidity(message)
        callback(e)
        setAnimationClass("MessageBubbleFade")
    }


    useEffect(()=>{
        document.body.addEventListener('click', resetAnimation())
        return cleanUp()
    }, [])

    function resetAnimation(){
        setAnimationClass("hidden")
        
    }

    function cleanUp(){
        document.body.removeEventListener('click', resetAnimation);
    }

    return (
        <>
            <div id="MessageBubble" className={animationClass}>{message}</div>
            <input className="CopyMeInput" onClick={(e)=>{CopyMeHandle(e)}} value={customInput} />
        </>
    )
}

export default CopyMeInput