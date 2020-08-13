import React from 'react'
import './Group.css'

const Group = (props: { children?: React.ReactChild, label: string, className?: string, id?:string }) => {
    return (
        <div className={`group ${props.className}`} id={props.id}>
            {props.children}
            <div className="label center">{props.label}</div>
        </div>
    )
}

export default Group