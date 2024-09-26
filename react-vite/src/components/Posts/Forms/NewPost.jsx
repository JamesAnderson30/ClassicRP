import { useState } from "react"
import { sendPost } from "../../../redux/post";
import { useDispatch } from "react-redux";
function NewPostForm(){
    let topic_id = -1;
    console.log("topic_id: ", topic_id)
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const dispatch = useDispatch()
    let handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(sendPost({body, topic_id}))
    }
    return(
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="topic_id" value={topic_id} />
            <label>
                Body
                <input type="text" value={body} onChange={(e)=>setBody(e.target.value)} />
            </label>
            <button type="submit"></button>
        </form>
    )
}

export default NewPostForm;
