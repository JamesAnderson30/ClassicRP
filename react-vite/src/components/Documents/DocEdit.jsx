
// THIS IS BOTH FOR NEW DOCUMENTS AND EDITING

import { useEffect, useState } from "react"
import BigInput from "../Input/BigInput";
import BigButton from "../Button/LeftButton";
import { createDispatchHook, useDispatch, useSelector } from "react-redux";
import SmallInput from "../Input/SmallInput";
import { getDocument, updateDocument, deleteDocument } from "../../redux/document";
import "./Document.css"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CopyMeInput from "../Input/CopyMeInput";
import LeftButton from "../Button/LeftButton";
import RightButton from "../Button/RightButton";
import DeleteConfirmButton from "../Button/DeleteConfirmButton";
import Loading from "../loading";

function DocEdit(){
    const [isLoaded, setIsLoaded] = useState(false)
	const [subject, setSubject] = useState("")
	const [body, setBody] = useState("");
	const dispatch = useDispatch();
	let {id} = useParams()
    const navigate = useNavigate()
    const documentsById = useSelector(state=>state.document.byId);

	async function handleClick(){
		if(subject.length > 0 && body.length > 0){
			if(await dispatch(updateDocument({subject, body, id}))){
                alert("Document Saved!")
            } else {
                alert("Something went wrong. (Make a local copy for now!)")
            }
		}
	}

    async function handleDelete(){
        if(await dispatch(deleteDocument(id))){
            alert("Document Deleted!");
            navigate('/documents/manage');
        } else {
             alert("Something went wrong.");
        }
    }

	useEffect(()=>{
        async function loadDocument(){
            //If no document was found or some other error, redirect to 404
            let result = await dispatch(getDocument(id))
            console.log("result: ", result)
            if(!result){
                navigate("/404")
            }
            setSubject(result.subject);
            setBody(result.body);

        }
        if(!isLoaded){
            loadDocument()
            setIsLoaded(true)
        }
	}, [isLoaded])

    if(isLoaded){
    return (
    	<>
          			<div>
                        <br></br>
						<CopyMeInput data={`documents/${id}`} /> {"<--- Paste this anywhere to link your document!"}
					</div>
					<div>
						Document Subject. This is what your links will appear as. 
						<SmallInput value={subject} setValue={setSubject} />
					</div>
					<div id="NewDocumentBody">
						Your Document Contents:
						<BigInput value={body} setValue={setBody} />
						{/* <textarea className={"BigInput"} value={body} onChange={(e)=>{setBody(e.target.body)}} /> */}
					</div>
					<LeftButton text="Save Document" callback={handleClick} />
                    <DeleteConfirmButton reverse={true} deleteText="Delete Document" callBack={handleDelete}/>
      </>
    )
    }else {
        return(
            <Loading />
        )
    }
}

export default DocEdit