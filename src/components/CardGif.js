import React from "react";
import './CardGif.css'


export const CardGif = (props) => {
    return(
        <div className="gif-main">
            <div className="gif-user">
                <h3>User</h3>
            </div>
            <div className="gif-img">
                <img src={props.url} alt="gif_img" />
            </div>
        </div>
    )
} 