import React from "react";

function ButtonAnalyze({ title, onClick , disabled}) {
    return (
       
     <button onClick={onClick} disabled={disabled}>
        {title}
    </button>
    )
}

export default ButtonAnalyze;