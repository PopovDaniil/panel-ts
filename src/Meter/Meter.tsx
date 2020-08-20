import React from 'react'
import './Meter.sass'

const Meter = (props: { val: number, label: string, unit: string }) => {
    const val = props.val >= 1000 ? props.val / 1000 : props.val
    const unit = props.val >= 1000 ? "к" + props.unit : props.unit
    return (
        <div className="meter">
            <span>{val} {unit}</span>
            <div className="label small">{props.label}</div>
        </div>
    )
}

export default Meter