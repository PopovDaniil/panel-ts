import React from 'react'
import './Indicator.css'

const Indicator = (props: {val: string, label?: string, size?:string}) => {
    return (
        <React.Fragment>
            <div className={`indicator ${props.val} ${props.size ? props.size : "small"}`}/>
            <div className="label">{props.label}</div>
        </React.Fragment>
    )
}

export default Indicator