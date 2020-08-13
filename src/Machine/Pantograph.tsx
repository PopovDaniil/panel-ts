import React, { useState } from 'react'
import Switcher from '../Switcher/Switcher'
import Indicator from '../Indicator/Indicator'

function Pantograph(props: { label: string, raised?: boolean}) {
    const [state, setState] = useState(props.raised ? 2 : 0);
    const change = (val: 0 | 1) => {
        const newState = val === 1 ? 2 : 0
        setState(1);
        setTimeout(() => setState(newState), 2000)
    }
    const toString = () =>
        state === 2 ? "started" : state === 1 ? "starting" : "stopped";

        return (
            <>
            <Switcher descrOn="Поднять" descrOff="Опустить" initVal={props.raised ? 1 : 0} label={props.label} onSwitch={change} />
            <Indicator val={toString()} />
        </>
    )
}

export default Pantograph;