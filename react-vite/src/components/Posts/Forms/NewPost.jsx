import { useState, useEffect } from "react"
import { sendPost } from "../../../redux/post";
import { useDispatch } from "react-redux";
function NewPostForm(topic_id, addPost){

    const [subject, setSubject] = useState("");
    const [isDisabled, setIsDisabled] = useState("");
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState([])
    const [errorsHidden, setErrorsHidden] = useState(true)
    const dispatch = useDispatch()
    let handleSubmit = async (e) =>{
        e.preventDefault()
        let newErrors = []
        if(body.length < 1) newErrors.push("Post body cannot be empty!")
        if(newErrors.length > 1) setErrorsHidden(false);
        else {
            setErrorsHidden(true)
            await dispatch(sendPost({body, topic_id}))
        }
    }

    useEffect(()=>{
        if(body.length > 0) setIsDisabled(false)
        else setIsDisabled(true)
    }, [dispatch, body])
    
    return(
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="topic_id" value={topic_id} />
            <label>
                Author a new Post: 
                <input type="text" value={body} onChange={(e)=>setBody(e.target.value)} />
            </label>
            <button disabled={isDisabled} type="submit">Post!</button>
            <span hidden={errorsHidden}>{errors.map((error)=>{return <span>{error}</span>})}</span>
        </form>
    )
}

export default NewPostForm;
