import React from 'react'
import './Indicator.sass'

const Indicator = (props: {val: string, label?: string, size?:string}) => {
    return (
        <div className="flex-column">
            <div className={`indicator ${props.val} ${props.size ? props.size : "small"}`}/>
            <div className="label small">{props.label}</div>
        </div>
    )
}

export default Indicator