import React, { useState, useEffect, useLayoutEffect } from 'react';
import './App.sass';
import Group from './Group/Group';
import Switcher from './Switcher/Switcher';
import Indicator from './Indicator/Indicator';
import Meter from './Meter/Meter'

enum ComponentState {
    stopped, starting, started
}
enum SwitchState {
    off, on
}

interface IComponent {
    //constructor(val: ComponentState): IComponent
    get(): ComponentState
    set(newVal: SwitchState): void
    toSwitch(): SwitchState
}

abstract class Component implements IComponent {
    avDelay = 0;
    onSet(newVal: number) { }
    protected val: [ComponentState, any]
    constructor(val = 0 as ComponentState) {
        this.val = useState(val) as [ComponentState, any];
    }
    get(): ComponentState {
        return this.val[0]
    }
    set(newVal: SwitchState): void {
        this.val[1](ComponentState.starting);
        this.onSet(1)
        setTimeout(() => {
            this.val[1](newVal === 1 ? ComponentState.started : ComponentState.stopped);
            this.onSet(newVal);
        }, this.avDelay);
    }
    toSwitch(): SwitchState {
        return this.get() === 0 ? 0 : 1;
    }
    toString(): string {
        return ComponentState[this.get()]
    }
    toBoolean(): boolean {
        return this.get() === ComponentState.started;
    }
}

function App() {

     function PowerController() {
        const [current, setCurrent] = useState(0);
        const [front, setFront] = useState(ComponentState.stopped);
        const [back, setBack] = useState(ComponentState.started);
        const [mainSwitch, setMainSwitch] = useState(ComponentState.stopped);

        function changeFront(val: SwitchState) {
            setFront(ComponentState.starting)
            setTimeout(() => {
                setFront(toComponentState(val));
            }, 4000);
        }
        function changeBack(val: SwitchState) {
            setBack(ComponentState.starting)
            setTimeout(() => {
                setBack(toComponentState(val));
            }, 4000);
        }
        function changeMain(val: SwitchState) {
            setMainSwitch(ComponentState.starting)
            setTimeout(() => {
                setMainSwitch(toComponentState(val));
            }, 1500);
        }
        useEffect(changeCurrent);
        function changeCurrent() {
            (front === ComponentState.started || back === ComponentState.started) && mainSwitch === ComponentState.started ? setCurrent(25000) : setCurrent(0);
        }
        function toSwitchState(state: ComponentState): SwitchState {
            return state === ComponentState.started ? SwitchState.on : SwitchState.off;
        }

        function toComponentState(state: SwitchState): ComponentState {
            return state === SwitchState.on ? ComponentState.started : ComponentState.stopped;
        }

        function toString(state: ComponentState): string {
            return ComponentState[state]
        }
        return (
            <>
                <Group className="left" label="Токоприёмники">
                    <Switcher descrOn="Поднять" descrOff="Опустить" initVal={toSwitchState(front)} label="Передний" onSwitch={changeFront} />
                    <Switcher descrOn="Поднять" descrOff="Опустить" initVal={toSwitchState(back)} label="Задний" onSwitch={changeBack} />
                </Group>
                <Group label="Главный выключатель" className="left">
                    <Switcher descrOn="Замкнут" descrOff="Разомкнут" initVal={0} label="ГВ" onSwitch={changeMain} />
                </Group>
                <Group label="Питание" className="right" id="indicators">
                    <Indicator val={toString(front)} label="Передний" />
                    <Indicator val={toString(back)} label="Задний" />
                    <Indicator val={toString(mainSwitch)} label="ГВ" />
                    <Meter label="Напряжение" val={current} unit="В" />
                </Group>
            </>
        )
    }

    return (
        <PowerController />
    );
}

export default App;
