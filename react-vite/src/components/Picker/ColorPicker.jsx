function ColorPicker(value="red", callBack=()=>{}, extraClass = ""){
    const colors = [
        "red", "green", "blue", "yellow", "orange", "purple", "pink", "brown", "gray", 
        "black", "white", "cyan", "magenta", "lime", "teal", "olive", "navy", "maroon", 
        "silver", "gold", "aquamarine", "coral", "fuchsia", "indigo", "khaki", "lavender", 
        "orchid", "salmon", "turquoise", "violet"
      ];
    return (
        <select value={value} onChange={callBack(e)} className={`ColorPicker ${extraClass}`}>
            {colors.map((color)=>{
                <option value={color}/>
            })}
        </select>
    )
}

export default ColorPicker