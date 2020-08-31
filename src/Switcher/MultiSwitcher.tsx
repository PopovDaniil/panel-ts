import React, { useState, MouseEvent } from 'react'
import './Switcher.sass'

function MultiSwitcher(props: { states: string[], label?: string, initVal: number, onSwitch: (state: number) => void, step?: number }) {
    //console.assert((props.initVal > 0) && (props.initVal < props.states.length));
    const [state, setState] = useState(props.initVal);

    const down = (event: MouseEvent) => {
        state === props.states.length - 1 ? event.stopPropagation() : setState(state + 1);
        props.onSwitch(state + 1);
    }
    const up = (event: MouseEvent) => {
        event.preventDefault();
        state === 0 ? event.stopPropagation() : setState(state - 1);
        props.onSwitch(state - 1);
    }
    const STEP = props.step ?? 24;

    const labels = props.states.map((val, index) => {
        return (<div className="label tiny" style={{ marginBottom: `${10}px` }} key={index}>{val}</div>)
    });

    return (
        <div className="switcher" style={{ padding: '0px 5px' }}>
            <div style={{ margin: '5px' }}>
                <div className="case left" style={{ height: STEP * (props.states.length - 1), marginTop: '5px' }}>
                    <div className={`handle`} onClick={down} onContextMenu={up} style={{ transform: `translate(-45%,${STEP * state - 2}px)` }}></div>
                </div>
                <div className="right" style={{ marginLeft: '10px' }}>{labels}</div>
            </div>
            <div className="center label">{props.label}</div>
        </div>
    )
}

export default MultiSwitcher