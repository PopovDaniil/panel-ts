import React from 'react'
import './Meter.sass'

export default (props: { val: number|string, label?: string, unit?: string, fontSize?: number }) => {
    if (typeof props.val === "number") {
    const val = props.val >= 1000 ? props.val / 1000 : props.val
    const unit = props.val >= 1000 ? "к" + props.unit : props.unit
    return (
        <div className="meter">
            <span style={{fontSize: props.fontSize+'px'}}>{val} {unit}</span>
            <div className="label small">{props.label}</div>
        </div>
    )
    } else return (
        <div className="meter">
            <span style={{fontSize: props.fontSize+'px'}}>{props.val}</span>
            <div className="label small">{props.label}</div>
        </div>
    )
}