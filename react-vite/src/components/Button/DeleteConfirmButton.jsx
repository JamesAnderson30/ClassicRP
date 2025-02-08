import './button.css'
import { useState } from 'react';

function DeleteConfirmButton({callBack, reverse = false, margin=true, classString = "ConfirmDelete", deleteText = "Delete", confirmText = "Yes, Delete", declineText = "No, keep it"}){
    const [deleteButtonText, setDeleteButtonText] = useState(deleteText);
    const [hideDeleteButton, setHideDeleteButton] = useState(true);
    const [disableEditButton, setDisableEditButton] = useState(false);
    const [confirmDeleteButtonText, setConfirmDeleteButtonText] = useState(confirmText)
    
    let marginString = "wideNoMargin";
    if(margin){marginString="wide"}

    const FirstDeleteButton = () =>{
        if(hideDeleteButton){
            setHideDeleteButton(false);
            setDeleteButtonText(declineText);
        } else {
            setHideDeleteButton(true);
            setDeleteButtonText(deleteText);
        }
    }

    const ConfirmDeleteButton = async () =>{
        await dispatch(deletePost(post.id))
        setPost(null)
    }

    return(
        <>
            <div className={classString}>
                {reverse && 
                    <>
                        <button onClick={(e)=>{callBack(e)}} hidden={hideDeleteButton} className="ConfirmDeleteButton wide confirm">
                            {confirmDeleteButtonText}
                        </button>
                        <button onClick={FirstDeleteButton} className={`FirstDeleteButton ${marginString}`}>
                            {deleteButtonText}
                        </button>
                    </>
                }

                {reverse || 
                    <>
                        <button onClick={FirstDeleteButton} className={`FirstDeleteButton ${marginString}`}>
                            {deleteButtonText}
                        </button>
                        <button onClick={(e)=>{callBack(e)}} hidden={hideDeleteButton} className="ConfirmDeleteButton confirm wide">
                            {confirmDeleteButtonText}
                        </button>
                    </>
                }
            </div>
        </>
    )
}

export default DeleteConfirmButton