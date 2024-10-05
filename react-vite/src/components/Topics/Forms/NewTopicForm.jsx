import { useState } from "react"
import { sendPost } from "../../../redux/post";
import { useDispatch } from "react-redux";
function NewTopicForm({category_id}){

    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const dispatch = useDispatch()
    let handleSubmit = (e) =>{
        e.preventDefault();
        // dispatch(sendPost({body, topic_id}))
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="category_id" value={category_id} />
                Make a new topic
                <br></br>
                <label>
                    Subject
                    <input type="text" name="subject" value={subject} onChange={(e)=>setSubject(e.target.value)}/>
                </label>
                <label>
                    Body
                    <input type="text" value={body} onChange={(e)=>setBody(e.target.value)} />
                </label>
                <button type="submit">Post!</button>
            </form>
            <hr />
        </>
    )
}

export default NewTopicForm;
