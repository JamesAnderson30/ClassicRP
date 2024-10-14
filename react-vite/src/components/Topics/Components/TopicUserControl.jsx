import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { editTopic } from "../../../redux/topic";
import { deleteTopic } from "../../../redux/topic";



function TopicUsertControl({topic, setTopic}){
    const [hideForm, setHideForm] = useState(true);
    const [body, setBody] = useState(topic.body);
    const [subject, setSubject] = useState(topic.subject)
    const [deleteButtonText, setDeleteButtonText] = useState("Delete my topic!");
    const [hideDeleteButton, setHideDeleteButton] = useState(true)
    const [disableEditButton, setDisableEditButton] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(body.length > 0 && subject.length > 0) setDisableEditButton(false)
        else setDisableEditButton(true)
    },[body, subject])

    const editClick = () =>{
        if(!hideForm)setHideForm(true);
        else setHideForm(false)
    }

    const firstDeleteButton = () =>{
        if(hideDeleteButton){
            setHideDeleteButton(false);
            setDeleteButtonText("No, keep it");
        } else {
            setHideDeleteButton(true);
            setDeleteButtonText("Delete topic");
        }
    }

    const confirmDelete = async () =>{
        // console.log("confirmDelete");
        let res =  dispatch(deleteTopic(topic))

        // if(res === true){
            navigate(`/categories/${topic.category_id}`)
        // } else {
        //     alert("The delete wasn't possible!");
        // }
        // setPost(null)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        await dispatch(editTopic({body, subject, id: topic.id, category_id: topic.category_id}));
        setTopic({...topic, body: body, subject: subject});
        // console.log("setPost: ", {...post, body: body});
        //renderParent();
    }

    return(
        <div className="TopicUserControls">
            <button onClick={editClick} className="userControlButton">
                Edit my Topic
            </button>
            <button onClick={firstDeleteButton} className="userControlButton">
                {deleteButtonText}
            </button>
            <button onClick={confirmDelete} hidden={hideDeleteButton} className="userControlButton confirm">
                Yes, Delete!
            </button>
            <form hidden={hideForm} onSubmit={(e)=>handleSubmit(e)}>
                <input type="hidden" value={topic.category_id} name="category_id" />
                <label>
                    Body
                    <input type="text" value={body} onChange={(e)=>setBody(e.target.value)} />
                </label>
                <br/>
                <label>
                    Subject
                    <input type="text" value={subject} onChange={(e)=>setSubject(e.target.value)} />
                </label>
                <button disabled={disableEditButton} type="submit">Submit Edits!</button>
            </form>
        </div>
    )
}

export default TopicUsertControl;
