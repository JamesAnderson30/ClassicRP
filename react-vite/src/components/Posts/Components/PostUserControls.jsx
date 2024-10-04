import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../../../redux/post";

function PostUserControls({post}){
    const [hideForm, setHideForm] = useState(true);
    const [body, setBody] = useState(post.body);
    const dispatch = useDispatch();
    console.log("PostUserControls: ", post);
    console.log("hideForm: ", hideForm)


    const editClick = () =>{
        if(!hideForm)setHideForm(true);
        else setHideForm(false)
    }

    const deletePost = () =>{
        console.log("Delete Post: ", post);
    }

    const handleSubmit = () =>{
        dispatch(editPost())
    }

    return(
        <div className="PostUserControls">
            <button onClick={editClick} className="userControlButton">
                Edit
            </button>
            <button onClick={deletePost} className="userControlButton">
                Delete
            </button>
            <form hidden={hideForm} onSubmit={handleSubmit}>
                <input type="hidden" name="topic_id" value={post.topic_id} />
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
