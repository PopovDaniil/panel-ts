import React, { useState } from 'react'
import './Switcher.sass'

function Switcher(props: {descrOn: string, descrOff: string, label: string, initVal:0|1, onSwitch: (state: 0|1) => void}) {
    const [state, setState] = useState(props.initVal);
    /**
     * @param {Event} e 
     */
    const click = () => {
        const newState = state === 1 ? 0 : 1;
        setState(newState);
        props.onSwitch && props.onSwitch(newState);
    }
    return (
        <div className="switcher">
            <div className="center label tiny">{props.descrOn}</div>
            <div className="case">
                <div className={`handle ${state ? 'on' : 'off'}`} onClick={click}></div>
            </div>
            <div className="center label tiny">{props.descrOff}</div>
            <div className="center label">{props.label}</div>
        </div>
    )
}

export default Switcher