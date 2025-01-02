import { useEffect, useState } from "react"
import BigInput from "../Input/BigInput";
import BigButton from "../Button/LeftButton";
import { useDispatch } from "react-redux";
import SmallInput from "../Input/SmallInput";
import { sendTopic } from "../../redux/topic";
import "./Topic.css"
import { Navigate, useNavigate, useParams } from "react-router-dom";

function TopicNew(){

// THIS IS BOTH FOR NEW DOCUMENTS AND EDITING


        const [subject, setSubject] = useState("")
        const [body, setBody] = useState("");
        const dispatch = useDispatch();
        const navigate = useNavigate()
        let {id} = useParams()

        async function handleClick(){
            if(subject.length > 0 && body.length > 0){
                let res = (await dispatch(sendTopic({subject, body, category_id: id})));
                console.log("res: ", res)
                if(res.error){
                    alert(res.error)
                } else {
                    //console.log("res: ", res)
                    res = JSON.parse(res)
                    navigate(`/topic/${res.id}`)
                }

            }
        }



        useEffect(()=>{
            

        }, [])

        return (
            <>
                        <div>
                            Start your own topic! Please remember the rules and explain how players are to interact with your topic.
                        </div>
                        <div>
                            Topic Subject
                            <SmallInput value={subject} setValue={setSubject} />
                        </div>
                        <div id="NewDocumentBody">
                            Topic Body:
                            <BigInput value={body} setValue={setBody} />
                            {/* <textarea className={"BigInput"} value={body} onChange={(e)=>{setBody(e.target.body)}} /> */}
                        </div>
                        <BigButton text="Create New Topic" callback={handleClick} />
        </>
        )
    }



export default TopicNew