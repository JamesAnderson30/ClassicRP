import { useEffect, useState } from "react"
import { sendTopic } from "../../../redux/topic";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function NewTopicForm({category_id}){

    const [subject, setSubject] = useState("");
    const [isDisabled, setIsDisabled] = useState(true)
    const [body, setBody] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let handleSubmit = async (e) =>{
        e.preventDefault();
        let res = JSON.parse(await dispatch(sendTopic({body, category_id, subject})))

        navigate(`/topic/${res.id}`)
    }

    useEffect(()=>{
        if(body.length > 0 && subject.length > 0) setIsDisabled(false)
        else setIsDisabled(true)
    }, [dispatch, body, subject])
    
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="category_id" value={category_id} />
                Make a new topic
                <br></br>
                <label>
                    Subject:
                    <br />
                    <input type="text" name="subject" value={subject} onChange={(e)=>setSubject(e.target.value)}/>
                </label>
                <br />
                <label>
                    Body:
                    <br />
                    <input type="text" name="body" value={body} onChange={(e)=>setBody(e.target.value)} />
                </label>
                <button disabled={isDisabled} type="submit">Post!</button>
            </form>
            <hr />
        </>
    )
}

export default NewTopicForm;
