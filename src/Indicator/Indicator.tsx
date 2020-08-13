import React from 'react'
import './Indicator.css'

const Indicator = (props: {val: string, label?: string}) => {
    return (
        <React.Fragment>
            <div className={`indicator ${props.val}`}/>
            <div className="label">{props.label}</div>
        </React.Fragment>
    )
}

export default Indicator