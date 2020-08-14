import React from 'react'
import './Group.sass'

const Group = (props: { children?: React.ReactChild|React.ReactChild[], label: string, className?: string, id?: string }) => {
    return (
        <div className={`group-container ${props.className}`} id={props.id}>
            <div className='group'>
                {props.children}
            </div>
            <div className="label center">{props.label}</div>
        </div>
    )
}

export default Group