import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, editPost } from "../../../redux/post";



function PostUserControls({post, setPost}){
    const [hideForm, setHideForm] = useState(true);
    const [body, setBody] = useState(post.body);
    const [deleteButtonText, setDeleteButtonText] = useState("Delete");
    const [hideDeleteButton, setHideDeleteButton] = useState(true)
    const [disableEditButton, setDisableEditButton] = useState(false)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(body.length > 0) setDisableEditButton(false)
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
            setDeleteButtonText("Delete");
        }
    }

    const confirmDelete = async () =>{
        await dispatch(deletePost(post.id))
        setPost(null)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await dispatch(editPost({body, 'topic_id': post.topic_id, 'id': post.id}));
        setPost({...post, body: body});

        //renderParent();
    }

    return(
        <div className="PostUserControls">
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
                <input type="hidden" name="topic_id" value={post.topic_id} />
                <input type="hidden" name="id" value={post.id} />
                <label>
                    Body
                    <input type="text" value={body} onChange={(e)=>setBody(e.target.value)} />
                </label>
                <button type="submit">Post!</button>
            </form>
        </div>
    )
}

export default PostUserControls;
