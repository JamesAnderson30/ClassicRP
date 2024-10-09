import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, editPost } from "../../../redux/post";
import {useNavigate} from 'react-router-dom';
import { editTopic } from "../../../redux/topic";
import { deleteTopic } from "../../../redux/topic";



function TopicUsertControl({topic, setTopic}){
    const [hideForm, setHideForm] = useState(true);
    const [body, setBody] = useState(topic.body);
    const [subject, setSubject] = useState(topic.subject)
    const [deleteButtonText, setDeleteButtonText] = useState("Delete");
    const [hideDeleteButton, setHideDeleteButton] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            setDeleteButtonText("Delete");
        }
    }

    const confirmDelete = async () =>{
        // console.log("confirmDelete");
        let res = await dispatch(deleteTopic(topic))
        console.log("res: ", res);
        if(res === true){
            navigate(`/categories/${topic.category_id}`)
        } else {
            alert("The delete wasn't possible!");
        }
        // setPost(null)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log("Click");
        console.log(subject)
        await dispatch(editTopic({body, subject, id: topic.id, category_id: topic.category_id}));
        setTopic({...topic, body: body, subject: subject});
        // console.log("setPost: ", {...post, body: body});
        //renderParent();
    }

    return(
        <div className="TopicUserControls">
            <button onClick={editClick} className="userControlButton">
                Edit
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
                <button type="submit">Post!</button>
            </form>
        </div>
    )
}

export default TopicUsertControl;
