import { useState } from "react"
import { sendTopic } from "../../../redux/topic";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function NewTopicForm({category_id}){

    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let handleSubmit = async (e) =>{
        e.preventDefault();
        let res = JSON.parse(await dispatch(sendTopic({body, category_id, subject})))
        console.log("res: ", res);
        navigate(`/topic/${res.id}`)
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
                    <input type="text" name="body" value={body} onChange={(e)=>setBody(e.target.value)} />
                </label>
                <button type="submit">Post!</button>
            </form>
            <hr />
        </>
    )
}

export default NewTopicForm;
