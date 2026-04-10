import React from "react";

function InputText({ value, setValue }) {
    return (
        <textarea
            value={value} // 
            onChange={(e) => setValue(e.target.value)} 
        />
    );
}

export default InputText;