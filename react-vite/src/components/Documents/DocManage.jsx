import { useEffect, useState } from "react";
import GroupPicker from "../Groups/GroupPicker";
import { useDispatch } from "react-redux";
import { getUserDocuments } from "../../redux/document";
import Tile from "../Tiles/Tile";
import Loading from "../loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LinkButton from "../Button/LinkButton";
function DocManage(){
	const [isLoaded, setIsLoaded] = useState(false)
	const user = useSelector(state=> state.session.user);
	const documents = useSelector(state=>state.document.all);
	const dispatch = useDispatch()
	const navigate = useNavigate()
	console.log("isLoaded: ", isLoaded)
	function testHandle(group_id){
		console.log("testHandle: ", group_id)
	}

	console.log("documents: ", documents)

	useEffect(()=>{
		async function loadDocuments(){
			let res = await dispatch(getUserDocuments())
			console.log("res: ", res)
			if(res == false){
				//Anything we wanna do if we can't get documents
				setIsLoaded(true)
			} else {
				setIsLoaded(true)
			}
		}
		if(!isLoaded){
			loadDocuments();
		}
	}, [isLoaded])


	//If user not logged in 
	if(!user){
		console.log("omfg")
		navigate("/")
		return <></>
	}
	
	//If not loaded
	if(isLoaded){
    	return(
		
		<>
			<div>
					<h3>Welcome do your documents</h3>
						<p>Here you can create documents to enchance your roleplay and worldbuilding. Once you create your document, you can link it in your topics, posts, and profiles.</p>
					</div>
					<div>
						<LinkButton url={"/documents/new"} label={"Create Document"} />
						<GroupPicker def="All" groups={[{'name': 'test1', 'id':1}, {'name': 'test2', 'id':2}]} handler={testHandle} />
					</div>
					<hr></hr>
					<div id="DocumentList">
						
						{documents.map((document, i)=>{
							
							if(document.user_id == user.id){
								return <Tile key={"i"+i}link={`/documents/${document.id}/edit`} header={document.subject} body={document.body} />
							}
						})}
					</div>
			</>
		)
	} else {
		<Loading />
	}
}

export default DocManage;
