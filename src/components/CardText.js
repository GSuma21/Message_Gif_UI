import React from "react";
import './CardText.css'


export const CardText = (props) => {
    return(
        <div className="text-main">
            <div className="user">
                <h3>User</h3>
            </div>
            <p>{props.text}</p>
        </div>
    )
} 