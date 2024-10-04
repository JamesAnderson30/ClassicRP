import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../../../redux/post";
import {useNavigate} from 'react-router-dom';



function PostUserControls({post, renderParent}){
    console.log("renderParent", renderParent);
    const [hideForm, setHideForm] = useState(true);
    const [body, setBody] = useState(post.body);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const editClick = () =>{
        if(!hideForm)setHideForm(true);
        else setHideForm(false)
    }

    const deletePost = () =>{
        console.log("Delete Post: ", post);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await dispatch(editPost({body, 'topic_id': post.topic_id, 'id': post.id}));
        navigate(`/topic/${post.id}`)
        //renderParent();
    }

    return(
        <div className="PostUserControls">
            <button onClick={editClick} className="userControlButton">
                Edit
            </button>
            <button onClick={deletePost} className="userControlButton">
                Delete
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
