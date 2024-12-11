import { useEffect, useState } from "react";
import GroupPicker from "../Groups/GroupPicker";
import { useDispatch } from "react-redux";
import { getUserDocuments } from "../../redux/document";
function DocManage(){
	const [isLoaded, setIsLoaded] = useState(false)
	const dispatch = useDispatch()
	function testHandle(group_id){
		console.log("testHandle: ", group_id)
	}

	useEffect(()=>{
		async function loadDocuments(){
			let res = await dispatch(getUserDocuments())
			console.log("res: ", res)
			if(res !== false){
				//Anything we wanna do if we can't get documents
			} else {
				setIsLoaded(true)
			}
		}
		if(!isLoaded){
			loadDocuments();
		}
	}, [isLoaded])

    return(
      <>
        <div>
					<h3>Welcome do your documents</h3>
					<p>Here you can create documents to enchance your roleplay and worldbuilding. Once you create your document, you can link it in your topics, posts, and profiles.</p>
				</div>
				<div>
					<GroupPicker def="All" groups={[{'name': 'test1', 'id':1}, {'name': 'test2', 'id':2}]} handler={testHandle} />
				</div>
				<hr></hr>
				<div>
					{/* <MediaTile tiles={[]} */}
				</div>
        </>
    )
}

export default DocManage;
