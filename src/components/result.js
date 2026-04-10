import React from "react";

function Result({ text }) {
    return (
        <div className="result">
            <h3>Result</h3>
            <p>{text}</p>
        </div>
    );
}

export default Result;