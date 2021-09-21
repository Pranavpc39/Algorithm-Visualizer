import React from 'react'
import './Button.scss';

export default function Button(props) {
    return (
        <div className="nav-btn-wrapper">
            <div className="nav-btn-container">
                <div className="nav-btn">
                    Target Number : {props.number}
                </div>
            </div>
        </div>
    )
}
