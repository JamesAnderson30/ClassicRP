function SmallInput({value, setValue, required = false}){
    return(
        <input value={value} required={required} onChange={(e)=>{setValue(e.target.value)}} />
    )
}

export default SmallInput