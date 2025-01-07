
// THIS IS BOTH FOR NEW DOCUMENTS AND EDITING

import { useEffect, useState } from "react"
import BigInput from "../Input/BigInput";
import BigButton from "../Button/LeftButton";
import { useDispatch } from "react-redux";
import SmallInput from "../Input/SmallInput";
import { sendDocument } from "../../redux/document";
import "./Document.css"
import { Navigate, useNavigate, useParams } from "react-router-dom";
function DocWrite(){
	const [subject, setSubject] = useState("")
	const [body, setBody] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate()
	let {id} = useParams()

	async function handleClick(){
		if(subject.length > 0 && body.length > 0){
			let res = (await dispatch(sendDocument(subject, body)));
			if(res.error){
				alert(res.error)
			} else {
				//console.log("res: ", res)
				navigate(`/documents/${res.id}/edit`)
			}

		}
	}



	useEffect(()=>{
		

	}, [])

    return (
    	<>
          			<div>
						You can create any number of documents you would like here. You'll be provided with a link to use in your topics, posts, and profiles.
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
					<BigButton text="Create Document" callback={handleClick} />
      </>
    )
}

export default DocWrite