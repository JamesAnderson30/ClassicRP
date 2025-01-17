import { useState } from "react"
import PostBody from "./PostBody"
import { useSelector } from "react-redux"
import PostUserControls from "./PostUserControls";
import PostUser from "./PostUser";
import "./Post.css";
import DeleteConfirmButton from "../../Button/DeleteConfirmButton";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../redux/post";
import Button from "../../Button/Button";
import BigInput from "../../Input/BigInput";
import { editPost } from "../../../redux/post";

function TopicPost(id){
    id = id.id.substring(4); // We expect the id to be 'post1' so we just want the number
    const byIdStart = useSelector((state) => state.post.posts.byId);
    const user = useSelector(state=> state.session.user);
    const [post, setPost] = useState(byIdStart[id]);
    const [postBody, setPostBody] = useState(post.body);
    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useDispatch()
    
    let date = new Date(post.created_at).toLocaleString();
    if(date == "Invalid Date") date = new Date().toLocaleString();

    async function handleDelete(){
        await dispatch(deletePost(post.id))
        setPost(null)
    }

    async function showEditForm(){
        setIsEditing(!isEditing);
    }

    async function handleEdit(e){
        e.preventDefault();
        if(await dispatch(editPost({'body': postBody, 'topic_id': post.topic_id, 'id': post.id}))){
            setPost({...post, body: postBody});
            setIsEditing(false);
        } else {
            alert("Your post could not be edited");
        }
        
    }

    
    if(byIdStart[id]){
        //get user status
        return (
            <div id={`post${id}`} className="PostBody beigeBorder">
                <div className="UserArea">
                    <PostUser post={post} />
                    {user && post && user.id == post.user_id && 
                        <div className="PostUserControl">
                            <Button text="Edit Post" extraClass={"wide"} callBack={showEditForm} />
                            <DeleteConfirmButton reverse={false} extraClass={"wideNoMargin"} deleteText="Delete Post" callBack={handleDelete}/>
                        </div>
                    }
                </div>
                <div className="PostInfo suppressedText">
                    {post && date}
                </div>
                <div className="PostArea">
                    {!isEditing && <PostBody post={post} />}
                    {isEditing && <><BigInput value={postBody} extraClass="minusBigButton" setValue={setPostBody} required={true} /><Button extraClass="wide bigButton" text="Submit Edits" callBack={handleEdit} /></>}
                    
                </div>
            </div>
        )
    }
}

export default TopicPost;
