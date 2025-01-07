import { useState } from "react";

function GroupPicker({groups,def/*ault*/, handler}){
    const [selectedGroup, setSelectedGroup] = useState("default")
    const handleChange = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        setSelectedGroup(e.target.value);
        if(handler instanceof Function ){
            handler(e.target.value);
        }
    }
    return (
        <select type="select" className="TopicPostList"
            value={selectedGroup}
            onChange={(e)=>{handleChange(e)}}
        >
            <option value={"default"}>{def}</option>
            {groups.map((group, i)=>{
                return (
                    <option key={i * group.id}value={group.id}>
                        {group.name}
                    </option>
                )
            })}
        </select>
    )
}

export default GroupPicker;